import Product from "../models/Products.js";
import Order from "../models/Order.js";
import orderService from "../services/orderService.js";
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


export async function getPgOrders(req, res) {
    try {
        const { userId } = req.params;
        const query = `
        SELECT 
            o.id AS order_id, 
            o.total_price, 
            o.status AS order_status, 
            o.created_at, 
            -- Address Details
            a.name AS shipping_name, 
            a.email AS shipping_email, 
            a.phone AS shipping_phone, 
            a.address AS shipping_address,
            -- Nested Array of Order Items
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'item_id', oi.id,
                        'product_id', p.id,
                        'product_name', p.name,
                        'image_url', p.image_url,
                        'category', p.category,
                        'brand', p.brand,
                        'quantity', oi.quantity,
                        'price_at_purchase', oi.price
                    )
                ) FILTER (WHERE oi.id IS NOT NULL), '[]'
            ) AS items
        FROM orders o 
        LEFT JOIN addresses a ON o.address_id = a.id 
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id 
        WHERE o.user_id = $1 
        GROUP BY o.id, a.id
        ORDER BY o.created_at DESC;
    `;
        const result = await pgPool.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
    }
}

export async function createPgOrder(req , res){
    try {
                const { items, totalAmount, shippingAddress } = req.body;
                const userId = req.user.id;

                if (!Array.isArray(items) || items.length === 0) {
                        return res.status(400).json({ message: "Order items are required" });
                }

                const result = await orderService.createPgOrder({
                        userId,
                        items,
                        totalAmount,
                        shippingAddress,
                });

                res.status(201).json({
                        message: "Order created successfully",
                        order: { id: result.orderId },
                });
    } catch (error) {
        console.log('Error creating order:', error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }


    
    
}


export async function deleteOrder(req, res) {
    try {
        const { orderId } = req.params;
        await pgPool.query('DELETE FROM orders WHERE id = $1;', [orderId]);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
}