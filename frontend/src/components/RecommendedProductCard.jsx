import React from 'react'
import { useCartStore } from '../stores/useCartStore'

function RecommendedProductCard({product}) {
  const {addToCart} = useCartStore();
  return (
    <div className='flex flex-col gap-2 border-1 border-gray-300 rounded-md p-2 w-full'>
      <img src={product.image} alt={product.name} className='w-full h-48 object-cover' />
      <h3 className='text-lg font-bold'>{product.name}</h3>
      <p className='text-sm text-gray-500'>{product.description}</p>
      <p className='text-lg font-bold'>${product.price}</p>
      <button onClick={() => addToCart(product)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add to Cart</button>
    </div>
  )
}

export default RecommendedProductCard
