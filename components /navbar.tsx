"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in securely via localStorage
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>

      {/* Main Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          STYLE<span>KART</span>
        </Link>

        {/* Nav Links */}
        <ul className="navbar-links">
          <li><Link href="/men">MEN</Link></li>
          <li><Link href="/women">WOMEN</Link></li>
          <li><Link href="/kids">KIDS</Link></li>
          <li><Link href="/home-kitchen">HOME AND KITCHEN</Link></li>
        </ul>

        {/* Search */}
        <form onSubmit={handleSearch} className="navbar-search flex items-center">
          <button type="submit" className="bg-transparent border-none p-0 cursor-pointer flex items-center">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 bg-transparent outline-none border-none text-sm w-full"
          />
        </form>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Wishlist */}
          <a href="#">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </a>
          {/* Cart */}
          <Link href="/cart" className="relative flex items-center">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >

              <circle cx="9" cy="21" r="1"></circle>

              <circle cx="20" cy="21" r="1"></circle>

              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>

            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {/* Sign In / Sign Out Dynamic Button */}
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="btn-signin" style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="btn-signin">Sign In</Link>
          )}
        </div>
      </nav>
    </>
  );
}

