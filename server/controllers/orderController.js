import Product from "../models/Products.js";
import Order from "../models/Order.js";
import pgPool from "../config/pgdb.js";

export async function createOrder(req, res) {
    if(!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        const userId = req.user.id;
        console.log("Creating order for user:", userId);

        const newOrder = new Order({
            user: userId,
            products: items.map(item => ({      
                productId: item.productId,
                qty: item.qty,
            })),
            totalAmount,
            // Remove array wrapping if using single object schema
            address: Array.isArray(shippingAddress) ? shippingAddress[0] : shippingAddress,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
}

export async function getUserOrders(req, res) {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }).populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
}


export async function createPgOrder(req , res){
    const { items, totalAmount, shippingAddress } = req.body;

    const client = await pgPool.connect()
    try {
        const userId = req.user.id
        //Step-1
        await client.query('BEGIN'); // Start transaction
        //inserting in adresstabl 
        const adr_query = 'INSERT INTO ADDRESSES (user_id, name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id;'
        const adr_values = [userId , shippingAddress.name , shippingAddress.email , shippingAddress.phone , shippingAddress.address];
        const adr_id = await client.query(adr_query , adr_values);

        //Step-2
        //inserting into order table
        const ord_T_val = [userId , Number(totalAmount) , adr_id.rows[0].id];

        const query = 'INSERT INTO ORDERS (user_id , total_price , address_id ) VALUES($1 , $2 , $3) RETURNING id;'
        const id = await client.query(query , ord_T_val);

        //Step-3
        //inserting in items table
        const values = items.flatMap(item => [
         id.rows[0].id,
         item.productId,
        Number(item.quantity),
        Number(item.price)
        ])

        const placeholders = items.map((_, index) => {
            const base = index * 4;
            return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`;
          }).join(', ');
          
          // 3. Combine into a single bulk insert query
          const items_query = `
            INSERT INTO ORDER_ITEMS (order_id, product_id, quantity, price)
            VALUES ${placeholders};
          `;

          await client.query(items_query , values)


          for (const item of items) {
            const updateStockQuery = `
              UPDATE products 
              SET stock = stock - $1 
              WHERE id = $2;
            `;
            await client.query(updateStockQuery, [Number(item.quantity), item.productId]);
          }

          await client.query('COMMIT'); // Commit transaction

          res.status(201).json({ message: "Order created successfully", order:id.rows[0]});
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction
        console.log('Error creating order:', error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }finally {
        await client.release(); // Close the connection
    }


    
    
}