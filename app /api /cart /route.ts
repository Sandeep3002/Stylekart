import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Cart API endpoint: retrieve cart items" });
}

export async function POST(request: Request) {
    const data = await request.json();
    // TODO: Add actual add-to-cart logic
    return NextResponse.json({ message: "Added item to cart", data });
}

export async function DELETE(request: Request) {
    // TODO: Add actual remove-from-cart logic
    return NextResponse.json({ message: "Removed item from cart" });
}
