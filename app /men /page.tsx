"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const menProducts = [
    { id: "men-1", name: "Classic White Shirt", price: 999, image: "https://images.openai.com/static-rsc-3/xj9DhmyEIP0nV4S4DBEgJ6YTfGVhrZVXxwZwNTlYGPgUV7hNyuYjvszdIsZOXrdfKf-Z5bqmYmlz_R4SF2NmG44-8th0r8j9uw5F6hkF1iQ?w=400" },
    { id: "men-2", name: "Slim Fit Jeans", price: 1499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
    { id: "men-3", name: "Casual Polo", price: 799, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400" },
    { id: "men-4", name: "Formal Blazer", price: 2999, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" },
    { id: "men-5", name: "Chino Trousers", price: 1299, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400" },
    { id: "men-6", name: "Sports T-Shirt", price: 599, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
];

export default function MenPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-black text-white text-center py-16">
                <p className="tracking-widest text-sm text-yellow-400 mb-2">STYLEKART</p>
                <h1 className="text-5xl font-bold">MEN&apos;S COLLECTION</h1>
                <p className="text-gray-400 mt-3 text-lg">Bold. Classic. Effortless.</p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-bold mb-8 border-b-2 border-yellow-400 inline-block pb-1">
                    All Men&apos;s Wear
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                            <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 500}`}>
                                <div className="overflow-hidden h-80 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                            </Link>
                            <div className="p-5">
                                <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 500}`} className="block">
                                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">{product.name}</h3>
                                </Link>
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-xl font-black text-gray-900">₹{product.price.toLocaleString()}</p>
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
