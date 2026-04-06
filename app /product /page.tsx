"use client";

import React, { useState, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Tag, CreditCard, ShieldCheck, Truck } from "lucide-react";

export default function ProductPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse text-xl font-bold text-gray-400">Loading Product...</div>
        </div>}>
            <ProductContent />
        </Suspense>
    );
}

function ProductContent() {
    const [selectedSize, setSelectedSize] = useState("");
    const { addToCart } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract dynamic data from URL search parameters
    const productData = {
        id: searchParams.get("id") || "default-id",
        name: searchParams.get("name") || "Premium Product",
        price: Number(searchParams.get("price")) || 0,
        originalPrice: Number(searchParams.get("originalPrice")) || (Number(searchParams.get("price")) + 500) || 1000,
        image: searchParams.get("image") || "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800",
        brand: searchParams.get("brand") || "STYLEKART",
        description: searchParams.get("description") || "This high-quality product is designed for comfort and style, perfect for any occasion.",
    };

    const getSizes = () => {
        const name = productData.name.toLowerCase();
        if (name.includes("rice")) {
            return ["500g", "1kg", "2kg", "5kg", "10kg"];
        }
        return ["1 Pc", "2 Pcs", "4 Pcs", "6 Pcs"];
    };

    const sizes = getSizes();
    const discount = productData.originalPrice > 0
        ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size/quantity first!");
            return;
        }
        addToCart({
            id: `${productData.id}-${selectedSize}`,
            name: `${productData.name} (${selectedSize})`,
            price: productData.price,
            image: productData.image
        });
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert("Please select a size/quantity first!");
            return;
        }
        addToCart({
            id: `${productData.id}-${selectedSize}`,
            name: `${productData.name} (${selectedSize})`,
            price: productData.price,
            image: productData.image
        });
        router.push("/payment");
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: Featured Image */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-28">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
                                <img
                                    src={productData.image}
                                    alt={productData.name}
                                    className="h-full w-full object-contain p-4"
                                />
                                <div className="absolute top-6 right-6">
                                    <div className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg">
                                        <ShieldCheck className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:w-1/2">
                        <div className="flex flex-col gap-8">
                            {/* Header Info */}
                            <div>
                                <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-2 block">{productData.brand}</span>
                                <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">{productData.name}</h1>

                                <div className="flex items-center gap-4 mt-6">
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-black flex items-center gap-1">
                                        <ChevronDown className="w-4 h-4" /> {discount}% OFF
                                    </div>
                                    <span className="text-gray-400 line-through text-xl">₹{productData.originalPrice}</span>
                                    <span className="text-4xl font-black text-gray-900">₹{productData.price}</span>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-black text-gray-900 uppercase tracking-tight">Select Size</h3>
                                    <button className="text-blue-600 font-bold text-sm underline underline-offset-4">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[4rem] h-12 flex items-center justify-center border-2 rounded-2xl font-black transition-all duration-300 ${selectedSize === size
                                                ? "border-black bg-black text-white shadow-lg scale-105"
                                                : "border-gray-100 text-gray-400 hover:border-gray-900 hover:text-gray-900"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Offers Section */}
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-1 rounded-3xl shadow-lg">
                                    <div className="bg-white p-6 rounded-[calc(1.5rem-2px)]">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Tag className="w-5 h-5 text-blue-600" />
                                            <span className="font-black uppercase tracking-widest text-sm text-gray-900">Exclusive Offers</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl border-2 border-blue-50 bg-blue-50/30">
                                                <p className="font-black text-blue-900 mb-1">Bank Offer</p>
                                                <p className="text-xs text-blue-700 font-medium">Extra ₹50 off on select bank cards</p>
                                                <button className="mt-3 text-[10px] font-black uppercase text-blue-600 border-b-2 border-blue-600 pb-0.5">Apply Now</button>
                                            </div>
                                            <div className="p-4 rounded-2xl border-2 border-green-50 bg-green-50/30">
                                                <p className="font-black text-green-900 mb-1">UPI Special</p>
                                                <p className="text-xs text-green-700 font-medium">Flat 5% Cashback on UPI payments</p>
                                                <button className="mt-3 text-[10px] font-black uppercase text-green-600 border-b-2 border-green-600 pb-0.5">View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="h-16 border-4 border-black rounded-2xl font-black text-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    Add to cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="h-16 bg-[#FFD814] rounded-2xl font-black text-gray-900 uppercase tracking-widest hover:bg-[#F7CA00] transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <Truck className="w-6 h-6 text-gray-400" />
                                    <div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Fast Shipping</p>
                                        <p className="text-[9px] text-gray-400 font-bold">Free delivery over ₹499</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-gray-400" />
                                    <div>
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Secure Store</p>
                                        <p className="text-[9px] text-gray-400 font-bold">30 Day hassle-free returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
