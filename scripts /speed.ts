import mongoose from 'mongoose';
import Product from '../models/Product';
import connectToDatabase from '../lib/mongodb';

const products = [
  {
    name: "Classic White Tee",
    category: "men",
    price: 29,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300&h=400",
    description: "A comfortable white t-shirt for daily wear.",
    stock: 50
  },
  {
    name: "Summer Floral Dress",
    category: "women",
    price: 59,
    image: "https://images.unsplash.com/photo-1572804013307-f9615c127160?auto=format&fit=crop&q=80&w=300&h=400",
    description: "Flowy and vibrant summer dress for any occasion.",
    stock: 30
  },
  {
    name: "Kids' Denim Jacket",
    category: "kids",
    price: 45,
    image: "https://images.unsplash.com/photo-1519457431-7571b0297aa5?auto=format&fit=crop&q=80&w=300&h=400",
    description: "Stylish and durable denim jacket for children.",
    stock: 20
  },
    {
    name: "Modern Home Décor Set",
    category: "home-kitchen",
    price: 89,
    image: "https://images.unsplash.com/photo-1513519247388-4a26d18b4dd4?auto=format&fit=crop&q=80&w=300&h=400",
    description: "Elegant décor set to enhance your living space.",
    stock: 15
  }
];

async function seed() {
    try {
        console.log("Connecting to database...");
        await connectToDatabase();
        
        console.log("Emptying products collection...");
        await Product.deleteMany({});
        
        console.log("Seeding products...");
        await Product.insertMany(products);
        
        console.log("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
}

// Check if MONGODB_URI exists since this script is run via CLI
if (!process.env.MONGODB_URI) {
    // If not in env, we can try to source from .env.local if needed
    // But usually you'd run this with: npx ts-node -r dotenv/config scripts/seed.ts
}

seed();
