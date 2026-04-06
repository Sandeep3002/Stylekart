"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product, className }: { product: any, className?: string }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className={className || "mt-3 w-full bg-yellow-400 text-black py-2 rounded hover:bg-black hover:text-yellow-400 transition font-semibold"}
        >
            Add to Cart
        </button>
    );
}
