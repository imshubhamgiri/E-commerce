import express from 'express';
import { getAllProducts, getProductById  , addProduct} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts); // Get all products
productRouter.post('/add', addProduct); // Add new product route for admin role
productRouter.get('/:Id', getProductById); 
// productRouter.put('/:Id', updateProduct); // Update product route for admin role
// productRouter.delete('/:Id', deleteProduct);

export default productRouter;