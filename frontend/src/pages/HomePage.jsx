import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useCartStore } from "../stores/useCartStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } =
    useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);



  console.log("featuredProducts", featuredProducts);

  return (
	<>
    <div className="flex flex-col items-center justify-center relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-30 py-20">
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--soft-peach) 0%, var(--warm-beige) 50%, var(--muted-coral) 100%)",
          }}
          className="flex flex-row items-center p-3 border-2 border-gray-300 rounded-3xl w-full mt-20 gap-5"
        >
          <div id="home" className="flex flex-col justify-center w-1/2 p-3 pb-30">
            <h2 className="text-6xl font-bold mb-8 mt-30">
              Welcome to Your Cozy Corner
            </h2>
            <p className="text-3xl">
              Discover handpicked items that bring warmth and comfort to your
              everyday life
            </p>
            <button className="bg-white text-amber-800 px-4 py-5 w-1/2 mt-10 hover:bg-amber-800 hover:text-white transition-all duration-300 ease-in-out rounded-full text-2xl font-bold">
              Explore Collection
            </button>
          </div>

          <img
            src="/images/cozy-corner.jpg"
            alt="cozy-corner"
            className="w-1/2 h-1/2"
          />
        </div>

        <div id="category" className="flex flex-col justify-center w-full items-center">
          <h2 className="text-6xl font-bold mb-8 mt-30 text-[#BF360C]">
            Shop by Category
          </h2>
          <p className="text-3xl text-[#6d1b0299]">
            Find exactly what makes you feel at home
          </p>

          <div id="featured" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 w-full">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>
        </div>

        {!loading && featuredProducts?.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}

{/* About Us */}
<div id="about" className="flex flex-col items-center justify-center w-full">
  <h2 className="text-6xl font-bold mb-8 mt-30 text-[#BF360C]">About Us</h2>
  <p className="text-3xl text-[#6d1b0299] bg-[#fddfc6df] p-10 rounded-3xl">
    We are a team of passionate individuals who are dedicated to providing the best products and services to our customers. Our journey began with a simple mission: to create a warm, welcoming space where people can discover carefully curated items that bring comfort and joy to their daily lives. We believe that every home deserves to be filled with pieces that not only look beautiful but also feel meaningful and authentic. From handcrafted textiles to artisanal home decor, each product in our collection is thoughtfully selected to enhance your living space and create moments of tranquility in your busy world. We're committed to sustainable practices, supporting local artisans, and building lasting relationships with our community of customers who share our appreciation for quality craftsmanship and timeless design.
  </p>
</div>

</div>
</div>

{/* footer */}

<footer id="contact" style={{background: "linear-gradient(135deg, var(--warm-beige) 0%, var(--soft-peach) 100%)"}} className=" border-t border-[#FFCCBC] mt-20">
  <div className="min-w-full py-15 px-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
    {/* Brand/About */}
    <div>
      <h2 className="text-2xl font-bold text-[#BF360C] mb-4">CozyCommerce</h2>
      <p className="text-xl text-[#8D6E63]">
        Discover handpicked products that bring warmth and comfort to your everyday life. Shop with us for a cozy, inviting experience!
      </p>
    </div>
    {/* Platform */}
    <div>
      <h2 className="text-2xl font-bold text-[#BF360C] mb-4">Platform</h2>
      <ul className="space-y-2 text-xl">
        <li><a href="/" className="hover:text-[#BF360C]">Home</a></li>
        <li><a href="/category/jeans" className="hover:text-[#BF360C]">Shop</a></li>
        <li><a href="/about" className="hover:text-[#BF360C]">About</a></li>
        <li><a href="/cart" className="hover:text-[#BF360C]">Cart</a></li>
      </ul>
    </div>
    {/* Support */}
    <div>
      <h2 className="text-2xl font-bold text-[#BF360C] mb-4">Support</h2>
      <ul className="space-y-2 text-xl">
        <li><a href="/help" className="hover:text-[#BF360C]">Help Center</a></li>
        <li><a href="/contact" className="hover:text-[#BF360C]">Contact Us</a></li>
        <li><a href="/privacy" className="hover:text-[#BF360C]">Privacy Policy</a></li>
        <li><a href="/terms" className="hover:text-[#BF360C]">Terms of Service</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div >
      <h2 className="text-2xl font-bold text-[#BF360C] mb-4">Contact</h2>
      <ul className="space-y-2 text-xl text-[#8D6E63]">
        <li>Email: support@cozycommerce.com</li>
        <li>Phone: (555) 123-4567</li>
        <li>Address: 123 Cozy St, Comfort City</li>
      </ul>
    </div>
  </div>
  <div className="border-t border-[#FFCCBC] text-center py-4 text-[#8D6E63] text-sm">
    © {new Date().getFullYear()} CozyCommerce. All rights reserved.
  </div>
</footer>

</>
  );
};
export default HomePage;
