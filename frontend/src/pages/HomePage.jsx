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
    <div className="flex flex-col items-center justify-center relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-30 py-20">
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--soft-peach) 0%, var(--warm-beige) 50%, var(--muted-coral) 100%)",
          }}
          className="flex flex-row items-center p-3 border-2 border-gray-300 rounded-3xl w-full mt-20 gap-5"
        >
          <div className="flex flex-col justify-center w-1/2 p-3 pb-30">
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

        <div className="flex flex-col justify-center w-full items-center">
          <h2 className="text-6xl font-bold mb-8 mt-30 text-[#BF360C]">
            Shop by Category
          </h2>
          <p className="text-3xl text-[#6d1b0299]">
            Find exactly what makes you feel at home
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 w-full">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>
        </div>

        {!loading && featuredProducts?.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
