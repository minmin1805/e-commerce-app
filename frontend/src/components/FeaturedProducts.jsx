import React from 'react'
import ProductCard from './ProductCard'

function FeaturedProducts({featuredProducts}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {featuredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default FeaturedProducts
