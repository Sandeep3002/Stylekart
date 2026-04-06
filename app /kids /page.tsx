"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const kidsProducts = [
    { id: "kids-1", name: "Cartoon Printed Tee", price: 399, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400" },
    { id: "kids-2", name: "Denim Dungaree", price: 799, image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400" },
    { id: "kids-3", name: "Floral Frock", price: 599, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
    { id: "kids-4", name: "Hooded Sweatshirt", price: 699, image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400" },
    { id: "kids-5", name: "Track Suit Set", price: 899, image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400" },
    { id: "kids-6", name: "Ethnic Kurta Pyjama", price: 749, image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400" },
];

export default function KidsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-sky-500 text-white text-center py-16">
                <p className="tracking-widest text-sm text-yellow-300 mb-2">STYLEKART</p>
                <h1 className="text-5xl font-black uppercase tracking-tighter">Kids Corner</h1>
                <p className="text-sky-100 mt-3 text-lg font-bold">Playful. Bright. Comfortable.</p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <h2 className="text-2xl font-black mb-8 border-b-4 border-sky-500 inline-block pb-1 uppercase tracking-tight">
                    Cool Outfits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {kidsProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100">
                            <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 400}`}>
                                <div className="overflow-hidden h-96 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </Link>
                            <div className="p-6">
                                <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 400}`} className="block">
                                    <h3 className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors uppercase tracking-tight line-clamp-1">{product.name}</h3>
                                </Link>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-2xl font-black text-gray-900 leading-none">₹{product.price.toLocaleString()}</p>
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
