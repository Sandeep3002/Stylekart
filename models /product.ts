import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ["men", "women", "kids", "home-kitchen"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    image: {
        type: String,
        required: [true, "Please provide an image URL"],
    },
    description: {
        type: String,
        required: false,
    },
    stock: {
        type: Number,
        default: 10,
    },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
