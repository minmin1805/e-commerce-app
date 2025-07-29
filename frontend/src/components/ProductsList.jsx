import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products);

	return (
		<motion.div
			className='bg-white shadow-lg rounded-lg overflow-hidden max-w-[85%] mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700'>
				<thead className='bg-white'>
					<tr>
						<th
							style={{ color: "var(--gentle-brown)" }}
							scope='col'
							className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'
						>
							Product
						</th>
						<th
							style={{ color: "var(--gentle-brown)" }}
							scope='col'
							className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'
						>
							Price
						</th>
						<th
							style={{ color: "var(--gentle-brown)" }}
							scope='col'
							className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'
						>
							Category
						</th>

						<th
							style={{ color: "var(--gentle-brown)" }}
							scope='col'
							className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'
						>
							Featured
						</th>
						<th
							style={{ color: "var(--gentle-brown)" }}
							scope='col'
							className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'
						>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-white divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-[#FFCCBC]'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>
										<img
											width={80}
											height={80}
											className=' rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4'>
										<div className='text-xl font-medium text-[#20090283]'>{product.name}</div>
									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-xl text-[#BF360C]'>${product.price.toFixed(2)}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-xl text-[#BF360C]'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-xl font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};
export default ProductsList;