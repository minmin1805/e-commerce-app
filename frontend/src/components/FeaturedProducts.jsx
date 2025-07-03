import React from 'react'
import ProductCard from './ProductCard'

function FeaturedProducts({featuredProducts}) {
  return (
    <div className='flex flex-col items-center justify-center w-full'>

      <h2 className='text-6xl font-bold mb-8 mt-30 text-[#BF360C]'>Featured Products</h2>
      <p className='text-3xl text-[#6d1b0299]'>Our most loved items this season</p>

    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 w-full'>
      {featuredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>

    </div>

  )
}

export default FeaturedProducts
