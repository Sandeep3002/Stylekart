"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, applyDiscount, discount } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [couponMsg, setCouponMsg] = useState("");

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === "SAVE10") {
            const amount = cartTotal * 0.1;
            applyDiscount(amount);
            setCouponMsg(`Coupon 'SAVE10' applied! 10% Discount.`);
        } else if (couponCode.toUpperCase() === "STYLE20") {
            const amount = cartTotal * 0.2;
            applyDiscount(amount);
            setCouponMsg(`Coupon 'STYLE20' applied! 20% Discount.`);
        } else {
            applyDiscount(0);
            setCouponMsg("Invalid coupon code.");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
                <p className="text-gray-500 mb-8">It seems your cart is empty.</p>
                <Link href="/shop" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    const taxAmount = cartTotal * 0.02; // Reduced tax to 2%
    const finalTotal = cartTotal + taxAmount - discount;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black mb-8 uppercase tracking-tight">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-6 border-b last:border-b-0">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Quantity controls */}
                                    <div className="flex items-center border rounded-lg text-lg">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-5 py-2 hover:bg-gray-100 rounded-l-lg transition font-medium">-</button>
                                        <span className="px-6 font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-5 py-2 hover:bg-gray-100 rounded-r-lg transition font-medium">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm transition tracking-widest uppercase">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Coupon Section */}
                        <div className="mt-8 pt-8 border-t">
                            <h3 className="text-lg font-bold mb-4">Have a Coupon?</h3>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter code (e.g. SAVE10)"
                                    className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    onClick={applyCoupon}
                                    className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition"
                                >
                                    Apply
                                </button>
                            </div>
                            {couponMsg && (
                                <p className={`mt-2 text-sm font-semibold ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {couponMsg}
                                </p>
                            )}
                            <div className="mt-2 text-xs text-gray-400">
                                Try codes: <span className="font-mono bg-gray-100 px-1">SAVE10</span> (10% off), <span className="font-mono bg-gray-100 px-1">STYLE20</span> (20% off)
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-black">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Tax (2%)</span>
                                    <span className="font-semibold text-black">₹{taxAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-black">
                                    <span>Total</span>
                                    <span className="text-yellow-500">₹{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link href="/payment" className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition shadow-lg active:scale-95 text-center block">
                                Checkout securely
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
