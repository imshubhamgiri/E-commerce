import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number, 
    },
  ],
  totalAmount: Number,
  address: {  // ✅ Changed to single object
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  status: { type: String, default: "Pending" },
},
 { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
