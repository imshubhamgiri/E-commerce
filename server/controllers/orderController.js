import Product from "../models/Products.js";
import Order from "../models/Order.js";

export async function createOrder(req, res) {
    try {
        const { userId, items, totalAmount, shippingAddress } = req.body;

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