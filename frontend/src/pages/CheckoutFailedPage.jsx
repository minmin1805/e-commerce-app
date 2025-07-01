import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CheckoutFailedPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className="flex flex-col items-center justify-center gap-5 bg-gray-800 p-20 rounded-lg">
            <FaTimesCircle className='text-red-500 text-4xl' />
            <p>Checkout Failed</p>
            <p>Please try again</p>
            <Link to ="/" >
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default CheckoutFailedPage
