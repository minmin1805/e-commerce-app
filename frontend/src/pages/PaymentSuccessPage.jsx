import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import axios from '../lib/axios';

function PaymentSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const {clearCart} = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
        try {
            axios.post("/payments/checkout-success", {sessionId});
            clearCart();
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsProcessing(false);
        }
    }

    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    console.log("sessionId", sessionId);
    if(sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
        setIsProcessing(false);
    }
  }, [clearCart]);

  if(isProcessing) {
    return <div className='flex items-center justify-center min-h-screen'>
        <div className="flex flex-col items-center justify-center gap-5 bg-gray-800 p-20 rounded-lg">
            <FaSpinner className='text-green-500 text-4xl' />
            <p>Processing your payment...</p>
        </div>
    </div>
  }
  else {
    return <Navigate to="/checkout-failed" />
  }
console.log("isProcessing", isProcessing);

  
  

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
