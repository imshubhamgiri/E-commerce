import mongoose from "mongoose";
const Productschema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, default: 10 },
},{
    timestamps:true
})

export default mongoose.model('Product', Productschema);