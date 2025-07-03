import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-2xl border border-gray-700 shadow-lg'>
			<div className='relative flex h-80 overflow-hidden rounded-xl'>
				<img className='object-cover w-full h-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h2 className='text-3xl font-semibold tracking-tight text-[#BF360C]'>{product.name}</h2>
				<p className='text-xl text-[#6d1b0299] mt-5'>{product.description}</p>
				<div className='mt-2 mb-5 flex items-center justify-between'>
				</div>
				<div className='flex flex-row items-center justify-between'>
				<p className='text-3xl font-bold text-[#BF360C]'>${product.price}</p>
				<button
					className='flex items-center justify-center rounded-2xl bg-[#FF8A65] px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-[#BF360C] focus:outline-none focus:ring-4 focus:ring-[#BF360C] transition-all duration-300 ease-in-out'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
				</div>

			</div>
		</div>
	);
};
export default ProductCard;