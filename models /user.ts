import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    phone: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
