import mongoose from 'mongoose';
import dotenv from 'dotenv'
import Product from './models/Products.js'; // Adjust path to your Product model

dotenv.config();
// MongoDB Connection String - Replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Data generators
const categories = [
  'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports & Outdoors',
  'Beauty & Personal Care', 'Toys & Games', 'Automotive', 'Health & Wellness',
  'Jewelry & Accessories', 'Shoes', 'Pet Supplies'
];

const brands = {
  'Electronics': ['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus'],
  'Clothing': ['Nike', 'Adidas', 'Zara', 'H&M', 'Levi\'s', 'Gap', 'Forever 21', 'Puma'],
  'Home & Kitchen': ['KitchenAid', 'Cuisinart', 'OXO', 'Pyrex', 'Instant Pot', 'Lodge'],
  'Books': ['Penguin', 'HarperCollins', 'Random House', 'Simon & Schuster', 'Macmillan'],
  'Sports & Outdoors': ['Nike', 'Adidas', 'Under Armour', 'Columbia', 'The North Face'],
  'Beauty & Personal Care': ['L\'Oreal', 'Maybelline', 'Neutrogena', 'Dove', 'Olay'],
  'Toys & Games': ['LEGO', 'Hasbro', 'Mattel', 'Fisher-Price', 'Nerf'],
  'Automotive': ['Bosch', 'Michelin', '3M', 'Armor All', 'Rain-X'],
  'Health & Wellness': ['Nature Made', 'Optimum Nutrition', 'Garden of Life', 'Centrum'],
  'Jewelry & Accessories': ['Pandora', 'Swarovski', 'Fossil', 'Michael Kors', 'Timex'],
  'Shoes': ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse', 'Vans', 'Reebok'],
  'Pet Supplies': ['Purina', 'Blue Buffalo', 'KONG', 'Greenies', 'Whiskas']
};

const productNames = {
  'Electronics': [
    'Wireless Headphones', 'Smart Watch', 'Laptop', '4K Monitor', 'Keyboard',
    'Mouse', 'Webcam', 'Tablet', 'Smartphone', 'Smart Speaker', 'Bluetooth Speaker',
    'Gaming Console', 'Wireless Charger', 'Power Bank', 'USB Cable', 'HDMI Cable'
  ],
  'Clothing': [
    'T-Shirt', 'Jeans', 'Hoodie', 'Jacket', 'Dress', 'Shirt', 'Shorts',
    'Sweater', 'Blazer', 'Skirt', 'Leggings', 'Tank Top', 'Cardigan', 'Polo Shirt'
  ],
  'Home & Kitchen': [
    'Coffee Maker', 'Blender', 'Toaster', 'Air Fryer', 'Pressure Cooker',
    'Non-Stick Pan', 'Knife Set', 'Cutting Board', 'Mixing Bowls', 'Dish Set'
  ],
  'Books': [
    'Fiction Novel', 'Self-Help Book', 'Cookbook', 'Biography', 'Mystery Thriller',
    'Science Fiction', 'Romance Novel', 'Business Book', 'Children\'s Book'
  ],
  'Sports & Outdoors': [
    'Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Running Shoes', 'Water Bottle',
    'Gym Bag', 'Jump Rope', 'Exercise Ball', 'Camping Tent', 'Hiking Backpack'
  ],
  'Beauty & Personal Care': [
    'Face Moisturizer', 'Shampoo', 'Conditioner', 'Body Lotion', 'Face Wash',
    'Lipstick', 'Foundation', 'Mascara', 'Perfume', 'Sunscreen'
  ],
  'Toys & Games': [
    'Building Blocks', 'Action Figure', 'Board Game', 'Puzzle', 'Doll',
    'Remote Control Car', 'LEGO Set', 'Stuffed Animal', 'Art Set'
  ],
  'Automotive': [
    'Car Phone Mount', 'Dash Cam', 'Car Vacuum', 'Tire Gauge', 'Jump Starter',
    'Car Cover', 'Floor Mats', 'Air Freshener', 'Car Wax'
  ],
  'Health & Wellness': [
    'Vitamin D', 'Multivitamin', 'Protein Powder', 'Fish Oil', 'Probiotics',
    'Green Tea Extract', 'Collagen Supplement', 'Omega-3'
  ],
  'Jewelry & Accessories': [
    'Necklace', 'Bracelet', 'Earrings', 'Ring', 'Watch', 'Sunglasses',
    'Wallet', 'Belt', 'Scarf', 'Hat'
  ],
  'Shoes': [
    'Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers',
    'High Heels', 'Flip Flops', 'Athletic Shoes'
  ],
  'Pet Supplies': [
    'Dog Food', 'Cat Food', 'Pet Bed', 'Dog Leash', 'Cat Toy',
    'Pet Carrier', 'Food Bowl', 'Scratching Post', 'Dog Treats'
  ]
};

const adjectives = [
  'Premium', 'Professional', 'Deluxe', 'Ultra', 'Pro', 'Advanced',
  'Classic', 'Modern', 'Essential', 'Perfect', 'Ultimate', 'Smart',
  'Elegant', 'Stylish', 'Comfortable', 'Durable', 'Lightweight'
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(category) {
  // Price ranges in Indian Rupees (INR)
  const ranges = {
    'Electronics': [1000, 150000],
    'Clothing': [200, 5000],
    'Home & Kitchen': [500, 30000],
    'Books': [100, 1500],
    'Sports & Outdoors': [300, 20000],
    'Beauty & Personal Care': [50, 5000],
    'Toys & Games': [100, 10000],
    'Automotive': [300, 40000],
    'Health & Wellness': [100, 10000],
    'Jewelry & Accessories': [500, 100000],
    'Shoes': [500, 25000],
    'Pet Supplies': [100, 10000]
  };
  const [min, max] = ranges[category] || [100, 10000];
  return (Math.random() * (max - min) + min).toFixed(2);
}

function generateProduct() {
  const category = randomElement(categories);
  const brand = randomElement(brands[category]);
  const baseName = randomElement(productNames[category]);
  const adjective = randomElement(adjectives);
  const name = Math.random() > 0.5 ? `${brand} ${baseName}` : `${adjective} ${baseName}`;
  
  const originalPrice = parseFloat(randomPrice(category));
  const hasDiscount = Math.random() > 0.6;
  const discountPercent = hasDiscount ? randomNumber(10, 50) : 0;
  const price = hasDiscount ? parseFloat((originalPrice * (1 - discountPercent / 100)).toFixed(2)) : originalPrice;
  
  return {
    name,
    description: `High-quality ${baseName.toLowerCase()} from ${brand}. Perfect for everyday use with excellent durability and performance. Features premium materials and exceptional craftsmanship.`,
    price,
    originalPrice,
    category,
    brand,
    imageUrl: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/400/400`,
    stock: randomNumber(0, 500)
  };
}

async function seedDatabase(count = 100) {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing data)
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Generate products
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push(generateProduct());
    }

    // Insert products
    const result = await Product.insertMany(products);
    console.log(`Successfully inserted ${result.length} products`);

    // Display some statistics
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    console.log('\nProducts by category:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} products (avg price: ₹${stat.avgPrice.toFixed(2)})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the seeder - Change the number to generate more/fewer products
seedDatabase(200);