import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";


const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});



	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
            console.log("Product created successfully");
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

	return (
		<motion.div
			className='max-w-[85%] mx-auto pb-20'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-4xl font-bold mb-6 text-[#BF360C]'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div  style={{ color: "var(--gentle-brown)" }}>
					<label htmlFor='name' className='block text-2xl'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-white rounded-md shadow-sm py-5 px-3 text-black focus:outline-none focus:ring-2 focus:ring-[#BF360C] focus:border-[#BF360C]'
						required
					/>
				</div>

				<div style={{ color: "var(--gentle-brown)" }}>
					<label htmlFor='description' className='block text-2xl'>
						Description
					</label>
					<textarea
						placeholder="Enter product description here..."
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-white rounded-md shadow-sm py-5 px-3 text-black focus:outline-none focus:ring-2 focus:ring-[#BF360C] focus:border-[#BF360C]'
						required
					/>
				</div>

				<div style={{ color: "var(--gentle-brown)" }}>
					<label htmlFor='price' className='block text-2xl'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-white rounded-md shadow-sm py-5 px-3 text-black focus:outline-none focus:ring-2 focus:ring-[#BF360C] focus:border-[#BF360C]'
						required
					/>
				</div>

				<div style={{ color: "var(--gentle-brown)" }}>
					<label htmlFor='category' className='block text-2xl'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-white rounded-md shadow-sm py-5 px-3 text-black focus:outline-none focus:ring-2 focus:ring-[#BF360C] focus:border-[#BF360C]'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-white text-[#BF360C] py-2 px-3 border border-[#BF360C] rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 '
					>
						<Upload className='h-5 w-5 inline-block mr-2 text-[#BF360C] hover:text-[#BF360C]' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-[#BF360C] hover:bg-[#BF360C] 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF360C] disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;