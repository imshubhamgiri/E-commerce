import pgPool from '../config/pgdb.js';
import orderEvents from '../events/orderEvents.js';

class OrderService {
  constructor(pool, events) {
    this.pool = pool;
    this.events = events;

    this.events.on('order.inventory.update', async ({ client, items }) => {
      await this.updateInventory(client, items);
    });
  }

  normalizeItems(items) {
    return items.map((item) => ({
      productId: item.productId,
      quantity: Number(item.quantity ?? item.qty ?? 0),
      price: Number(item.price ?? 0),
    }));
  }

  normalizeShippingAddress(shippingAddress) {
    return Array.isArray(shippingAddress) ? shippingAddress[0] : shippingAddress;
  }

  async withTransaction(work) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      const result = await work(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async createPgOrder({ userId, items, totalAmount, shippingAddress }) {
    const normalizedItems = this.normalizeItems(items);
    const normalizedShippingAddress = this.normalizeShippingAddress(shippingAddress);

    return this.withTransaction(async (client) => {
      const adrQuery = 'INSERT INTO ADDRESSES (user_id, name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
      const adrValues = [
        userId,
        normalizedShippingAddress.name,
        normalizedShippingAddress.email,
        normalizedShippingAddress.phone,
        normalizedShippingAddress.address,
      ];
      const adrResult = await client.query(adrQuery, adrValues);

      const orderQuery = 'INSERT INTO ORDERS (user_id, total_price, address_id) VALUES ($1, $2, $3) RETURNING id;';
      const orderValues = [userId, Number(totalAmount), adrResult.rows[0].id];
      const orderResult = await client.query(orderQuery, orderValues);

      const itemValues = normalizedItems.flatMap((item) => [
        orderResult.rows[0].id,
        item.productId,
        item.quantity,
        item.price,
      ]);

      const placeholders = normalizedItems
        .map((_, index) => {
          const base = index * 4;
          return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
        })
        .join(', ');

      const itemsQuery = `
        INSERT INTO ORDER_ITEMS (order_id, product_id, quantity, price)
        VALUES ${placeholders};
      `;

      await client.query(itemsQuery, itemValues);

        // await this.events.emitAsync('order.inventory.update', {
        //   client,
        //   items: normalizedItems,
        // });

      return {
        orderId: orderResult.rows[0].id,
        addressId: adrResult.rows[0].id,
      };
    });
  }

  async updateInventory(client, items) {
    for (const item of items) {
      const updateStockQuery = `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2;
      `;

      await client.query(updateStockQuery, [item.quantity, item.productId]);
    }
  }
}

const orderService = new OrderService(pgPool, orderEvents);

export default orderService;