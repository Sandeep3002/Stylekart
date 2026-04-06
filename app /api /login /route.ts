import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required", success: false }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Find the user
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password", success: false }, { status: 401 });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password", success: false }, { status: 401 });
        }

        // 3. Login Success
        return NextResponse.json({
            message: "Login Success",
            success: true,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
