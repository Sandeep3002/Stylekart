"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function PaymentPage() {
    const { cartTotal, discount } = useCart();
    const [method, setMethod] = useState("card");
    const [loading, setLoading] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Payment Successful! Order placed.");
            window.location.href = "/";
        }, 2000);
    };

    // Assuming 2% tax as set in cart page previously
    const taxAmount = cartTotal * 0.02;
    const finalTotal = cartTotal + taxAmount - (discount || 0);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/cart" className="text-gray-500 hover:text-black transition flex items-center gap-2 font-semibold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Secure Payment</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Payment Methods */}
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <button
                                    onClick={() => setMethod("card")}
                                    className={`p-6 border-2 rounded-xl flex items-center gap-4 transition ${method === 'card' ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className={`p-3 rounded-lg ${method === 'card' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-400'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <span className="font-bold">Credit/Debit Card</span>
                                </button>

                                <button
                                    onClick={() => setMethod("upi")}
                                    className={`p-6 border-2 rounded-xl flex items-center gap-4 transition ${method === 'upi' ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className={`p-3 rounded-lg ${method === 'upi' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-400'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="font-bold">UPI / PhonePe</span>
                                </button>
                            </div>

                            {method === "card" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Card Number</label>
                                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-400 outline-none transition" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-400 outline-none transition" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">CVV</label>
                                            <input type="text" placeholder="XXX" className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-400 outline-none transition" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Card Holder Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-400 outline-none transition" />
                                    </div>
                                </div>
                            )}

                            {method === "upi" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Enter VPA / UPI ID</label>
                                        <input type="text" placeholder="username@upi" className="w-full border rounded-xl px-4 py-4 focus:ring-2 focus:ring-yellow-400 outline-none transition" />
                                    </div>
                                    <p className="text-sm text-gray-400 italic">A payment request will be sent to your UPI app.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Review Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Amount</span>
                                    <span className="font-semibold text-black">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount Applied</span>
                                        <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax & Fees</span>
                                    <span className="font-semibold text-black">₹{taxAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-black">
                                    <span>Grand Total</span>
                                    <span className="text-yellow-500">₹{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={loading}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ₹${finalTotal.toLocaleString()}`
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                256-bit SSL Secure Payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
