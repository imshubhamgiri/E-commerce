import Product from '../models/Products.js';
import pgPool from '../config/pgdb.js';

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getAllProductsPg = async (req, res) => {
    const { page = 1, limit = 10, category, brand, price } = req.query; // Example query parameters for pagination
    // 1. Build the base WHERE clause conditions (Keep your existing code here)
    let conditions = [];
    let queryValues = [];
    let paramIndex = 1;

    if (category) {
        conditions.push(`category = $${paramIndex}`);
        queryValues.push(category);
        paramIndex++;
    }
    if (brand) {
        const brandList = brand.split(',').map(b => b.trim());
        conditions.push(`brand = ANY($${paramIndex})`);
        queryValues.push(brandList);
        paramIndex++;
    }
    if (price) {
        const [minPrice, maxPrice] = price.split('-');
        conditions.push(`price BETWEEN $${paramIndex} AND $${paramIndex + 1}`);
        queryValues.push(parseInt(minPrice), parseInt(maxPrice));
        paramIndex += 2;
    }

    // Create the shared WHERE string
    const whereClause = conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "";

    // 2. Build the Total Count Query (Uses the exact same values array so far)
    const countQuery = `SELECT COUNT(*) FROM products${whereClause}`;

    // 3. Build the Product Fetch Query (Append LIMIT and OFFSET)
    let productQuery = `SELECT * FROM products${whereClause}`;

    if (limit) {
        productQuery += ` LIMIT $${paramIndex}`;
        queryValues.push(parseInt(limit));
        paramIndex++;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    productQuery += ` OFFSET $${paramIndex}`;
    queryValues.push(offset);

    try {
        // Run both queries concurrently to save time
        const [countResult, productResult] = await Promise.all([
            pgPool.query(countQuery, queryValues.slice(0, paramIndex - 2)), // Only pass filter values to count
            pgPool.query(productQuery, queryValues) // Pass all values including limit/offset
        ]);

        const totalItems = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / parseInt(limit));

        // Return everything structured neatly for your frontend
        res.status(200).json({
            metadata: {
                totalItems,
                totalPages,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            },
            products: productResult.rows
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }

};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const Pgproduct = await pgPool.query('SELECT * FROM products WHERE id = $1', [id]);
        // const product = await Product.findById(id);
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }
        // res.status(200).json(product);
        res.status(200).json(Pgproduct.rows[0]);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching product', error: e });
    }
}


export const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

