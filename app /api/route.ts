import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ message: "Phone number is required", success: false }, { status: 400 });
        }

        await connectToDatabase();

        // 1. Generate a random 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 2. Find user by phone and update the OTP
        // Note: For a real app, you might want to create a separate OTP model
        const user = await User.findOneAndUpdate(
            { phone },
            { otp: otpCode },
            { new: true, upsert: true }
        );

        // 3. Simulate sending OTP (In a real app, use Twilio here)
        console.log(`Sending demo OTP ${otpCode} to ${phone}`);

        return NextResponse.json({
            message: `OTP sent successfully! (Demo: use ${otpCode})`,
            success: true
        });

    } catch (error: any) {
        console.error("OTP Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
