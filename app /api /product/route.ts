import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const query = searchParams.get("q");

        let filter: any = {};
        
        if (category && category.toLowerCase() !== "all") {
            filter.category = category.toLowerCase();
        }

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ];
        }

        const products = await Product.find(filter);

        return NextResponse.json({
            success: true,
            count: products.length,
            products
        });

    } catch (error: any) {
        console.error("Products Fetch Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}

// Optional: Add POST to seed products
export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const product = await Product.create(body);

        return NextResponse.json({
            success: true,
            product
        });
    } catch (error: any) {
        console.error("Product Creation Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
