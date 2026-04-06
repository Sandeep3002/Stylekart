"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

function ShopContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Men", "Women", "Kids", "Home & Kitchen"];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = new URL("/api/products", window.location.origin);
                if (query) url.searchParams.append("q", query);
                if (activeCategory !== "All") url.searchParams.append("category", activeCategory.toLowerCase().replace(" & ", "-"));
                
                const res = await fetch(url.toString());
                const data = await res.json();
                if (data.success) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, activeCategory]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-gray-900 text-white text-center py-14">
                <p className="tracking-widest text-sm text-yellow-400 mb-2">STYLEKART</p>
                <h1 className="text-5xl font-bold uppercase">
                    {query ? `Results for "${query}"` : activeCategory === "All" ? "SHOP ALL" : activeCategory}
                </h1>
                <p className="text-gray-400 mt-3">
                    {products.length} {products.length === 1 ? "product" : "products"} found
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-10">
                {/* Filter Tabs */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-semibold border transition whitespace-nowrap ${activeCategory === cat
                                ? "bg-black text-white border-black"
                                : "bg-white text-black border-gray-300 hover:border-black"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden group">
                                <Link href={`/product?id=${product._id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 600}`}>
                                    <div className="overflow-hidden h-64">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                                    <Link href={`/product?id=${product._id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 600}`} className="block">
                                        <h3 className="font-semibold text-lg mt-1 group-hover:text-yellow-600 transition">{product.name}</h3>
                                    </Link>
                                    <p className="text-yellow-500 font-bold mt-1">₹{product.price.toLocaleString()}</p>
                                    <AddToCartButton product={product} className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-yellow-400 hover:text-black transition font-semibold" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-400">No products found.</h2>
                        <p className="text-gray-500 mt-2">Try searching for something else or browse different categories.</p>
                        <button onClick={() => {setActiveCategory("All"); window.history.pushState({}, '', '/shop')}} className="mt-6 text-black underline font-semibold">View All Products</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}
