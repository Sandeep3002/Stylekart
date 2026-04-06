import Link from "next/link";

export default function Home() {
  return (
    <main>

      {/* HERO SECTION */}
      <section className="relative w-full h-[600px]">

        {/* Background Image */}
        <img
          src="https://png.pngtree.com/png-clipart/20250224/original/pngtree-the-best-shopping-experience-for-families-png-image_20509279.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />



        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>



        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">

          <p className="tracking-[4px] text-sm mb-3">
            STYLEKART ORIGINALS 2026
          </p>


          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            THE ART OF <br /> STYLE
          </h1>



          <Link href="/shop">

            <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition">
              EXPLORE NOW
            </button>

          </Link>


        </div>


      </section>


    </main>
  );
}