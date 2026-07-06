import express from 'express';
import { getAllProducts, getProductById  ,getAllProductsPg, addProduct, getFilter} from '../controllers/productController.js';
import pgPool from '../config/pgdb.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts); // Get all products
productRouter.get('/pg', getAllProductsPg); // Get all products from PostgreSQL
productRouter.post('/add', addProduct); // Add new product route for admin role
productRouter.get('/filters', getFilter);
productRouter.get('/:id', getProductById); 
// productRouter.put('/:Id', updateProduct); // Update product route for admin role
// productRouter.delete('/:Id', deleteProduct);


export default productRouter;