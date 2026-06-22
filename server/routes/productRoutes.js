import express from 'express';
import { getAllProducts, getProductById  ,getAllProductsPg, addProduct} from '../controllers/productController.js';
import pgPool from '../config/pgdb.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts); // Get all products
productRouter.get('/pg', getAllProductsPg); // Get all products from PostgreSQL
productRouter.post('/add', addProduct); // Add new product route for admin role
productRouter.get('/filters', async (req, res) => {
    try {
        // Run both queries concurrently
        const [categoriesResult, brandsResult] = await Promise.all([
            pgPool.query('SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category ASC'),
            pgPool.query('SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL ORDER BY brand ASC')
        ]);
        res.status(200).json({
            categories: categoriesResult.rows.map(row => row.category),
            brands: brandsResult.rows.map(row => row.brand)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching filters', error });
    }
});
productRouter.get('/:id', getProductById); 
// productRouter.put('/:Id', updateProduct); // Update product route for admin role
// productRouter.delete('/:Id', deleteProduct);


export default productRouter;