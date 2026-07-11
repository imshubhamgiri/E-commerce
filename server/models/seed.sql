-- 1. Seed a User
INSERT INTO users (name, email, password) 
VALUES ('John Doe', 'john@example.com', '$2b$10$8K1pI8u5v3v3v3v3v3v3uO5v3v3v3v3v3v3v3v3v3v3v3v3v3v');

-- 2. Seed Sample Products
INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock)
VALUES 
('Wireless Mouse', 'Ergonomic 2.4G computer mouse', 25.00, 29.99, 'Electronics', 'Logitech', 'https://example.com', 50),
('Mechanical Keyboard', 'RGB backlit gaming keyboard', 89.99, 99.99, 'Electronics', 'Corsair', 'https://example.com', 20),
('Running Shoes', 'Lightweight breathable sports shoes', 65.50, 75.00, 'Footwear', 'Nike', 'https://example.com', 15);

--check users and products
SELECT * FROM users;

Explain SELECT * FROM users ;

Explain analyze
SELECT * FROM products where category = 'Electronics' and price < 100;