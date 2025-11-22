import mongoose from "mongoose";

const CartSchmea = new mongoose.model({
     user: ObjectId, 
     items: [{ product: ObjectId, qty: Number, price, name, image }],
     updatedAt
})

export default mongoose.model('Cart' , CartSchmea);