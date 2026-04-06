"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const womenProducts = [
    { id: "women-1", name: "Floral Maxi Dress", price: 1799, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
    { id: "women-2", name: "Casual Denim Jacket", price: 2299, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
    { id: "women-3", name: "Silk Blouse", price: 1299, image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400" },
    { id: "women-4", name: "Palazzo Pants", price: 999, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400" },
    { id: "women-5", name: "Ethnic Kurta Set", price: 1599, image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400" },
    { id: "women-6", name: "Wrap Midi Skirt", price: 899, image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400" },
];

export default function WomenPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-[#804040] text-white text-center py-16">
                <p className="tracking-widest text-sm text-yellow-400 mb-2">STYLEKART</p>
                <h1 className="text-5xl font-bold uppercase tracking-tighter">Women Collection</h1>
                <p className="text-gray-200 mt-3 text-lg font-medium italic">Elegance in every stitch</p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-black mb-8 border-b-4 border-[#804040] inline-block pb-1 uppercase tracking-tight">
                    New Arrivals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {womenProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100">
                            <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 700}`}>
                                <div className="overflow-hidden h-96 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </Link>
                            <div className="p-6">
                                <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 700}`} className="block">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#804040] transition-colors uppercase tracking-tight line-clamp-1">{product.name}</h3>
                                </Link>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-2xl font-black text-gray-900 font-serif italic">₹{product.price.toLocaleString()}</p>
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
