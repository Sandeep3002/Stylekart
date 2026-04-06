"use client";

import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

const homeKitchenProducts = [
    { id: "home-1", name: "Modern Table Lamp", price: 1299, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
    { id: "home-2", name: "Wooden Dining Chair", price: 3499, image: "https://ebansal.com/cdn/shop/products/3_1500x1500_29321db5-b108-477d-b3a3-8bb8fb4bf581.jpg?w=400" },
    { id: "home-3", name: "Premium Basmati Rice", price: 549, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
    { id: "home-4", name: "Wall Clock Decor", price: 799, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400" },
    { id: "home-5", name: "Luxury Bed Sheet", price: 1599, image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400" },
    { id: "home-6", name: "Non-Stick Frying Pan", price: 999, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400" },
];

export default function HomeKitchenPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-emerald-900 text-white text-center py-20">
                <p className="tracking-[0.3em] text-xs text-emerald-400 mb-3 uppercase font-black">Stylekart Home</p>
                <h1 className="text-6xl font-black uppercase tracking-tighter">Living Well</h1>
                <p className="text-emerald-200/80 mt-4 text-xl font-light">Elegance meets everyday life.</p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-emerald-500 pl-4">
                        Curated Collection
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {homeKitchenProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 1000}`}>
                                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-500" />
                                </div>
                            </Link>

                            <div className="mt-6 px-2">
                                <Link href={`/product?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&originalPrice=${product.price + 1000}`} className="block">
                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</p>
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
