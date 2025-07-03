import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<div className='relative overflow-hidden h-120 w-full rounded-3xl group border-2 border-gray-300 shadow-lg mb-5'>
			<Link to={"/category" + category.href}>
				<div className='w-full h-full cursor-pointer flex flex-col items-center justify-center'>
					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-[60%] object-cover transition-transform duration-500 ease-out group-hover:scale-110'
						loading='lazy'
					/>
					<div className='w-full h-[40%] flex flex-col items-center justify-center p-3'>
						<h2 className='text-[#BF360C] text-4xl font-bold mb-5'>{category.name}</h2>
						<p className='text-[#6c1c0498] text-2xl text-center'>Explore our collection of {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;