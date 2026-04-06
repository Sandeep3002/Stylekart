"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Hero Banner"
        className="hero-img"
      />

      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Text Content */}
      <div className="hero-content">
        <p className="tagline">STYLEKART ORIGINALS 2026</p>
        <h1>THE ART OF<br />STYLE</h1>
        <Link href="/shop" className="btn-explore">
          EXPLORE NOW
        </Link>
      </div>
    </section>
  );
}
