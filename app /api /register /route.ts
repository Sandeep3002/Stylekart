import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password, phone } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required", success: false }, { status: 400 });
        }

        await connectToDatabase();

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: "User already exists", success: false }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            phone: phone || "",
        });

        return NextResponse.json({
            message: "User registered successfully!",
            success: true,
            user: {
                id: newUser._id,
                email: newUser.email,
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
