import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PaymentSuccessPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className="flex flex-col items-center justify-center gap-5 bg-gray-800 p-20 rounded-lg">
            <FaCheckCircle className='text-green-500 text-4xl' />
            <h1 className='text-2xl font-bold'>Payment Success</h1>
            <p className='text-gray-500'>Thank you for your purchase</p>
            <p>Check your email for order details and updates</p>

            <div className="flex flex-col gap-5 bg-gray-700 p-5 rounded-lg">
                <p>Order ID: 1234567890</p>
                <p>Estimated delivery: 2025-07-01</p>

            </div>
            <Link to="/">
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default PaymentSuccessPage
