import React, { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { FaTrashAlt } from "react-icons/fa";
import RecommendedProductCard from "../components/RecommendedProductCard";
import axios from "../lib/axios";

function CartPage() {
  const { cart, total, coupon, subtotal, removeFromCart, updateQuantity } = useCartStore();
  const [getRecommendedProducts, setGetRecommendedProducts] = useState([]);

  console.log("cart", cart);
  console.log("total", total);
  // console.log("coupon", coupon);
  // console.log("subtotal", subtotal);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const response = await axios.get(`/products/recommendation`);
      setGetRecommendedProducts(response.data);
    }
    fetchRecommendedProducts();
  }, [cart]);


  return (
    <div className="min-h-screen mt-20 flex flex-row gap-5">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-5">
          <h1>Your cart is empty</h1>
          <a href="/" className="text-blue-500 text-center">
            Continue shopping
          </a>
        </div>
      ) : (
        <>
          {/* Left Side */}
          <div className="ml-20 w-[60%]">
            {/* Cart Items */}
            <div className="flex flex-col gap-5 w-[100%]">
              {cart?.map((eachItem) => (
                <div className="flex flex-row justify-between items-center bg-gray-800 p-5 rounded-lg w-full">
                  <div className="flex flex-row gap-3">
                    <img
                      src={eachItem?.product?.image}
                      alt={eachItem?.product?.name}
                      width={150}
                      height={100}
                      className="object-cover rounded-lg ml-2"
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg font-bold">
                        {eachItem?.product?.name}
                      </h1>
                      <p className="text-sm text-gray-400">
                        {eachItem?.product?.description}
                      </p>
                      <FaTrashAlt
                        onClick={() => removeFromCart(eachItem?.product?._id)}
                        className="text-red-500 cursor-pointer text-2xl mt-12"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-15">
                    <div className="flex flex-row gap-1">
                      <button onClick={() => eachItem.quantity === 1 ? removeFromCart(eachItem.product._id) : updateQuantity(eachItem.product._id, eachItem.quantity - 1)} className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                        -
                      </button>
                      <p className="text-lg font-bold">{eachItem.quantity}</p>
                      <button onClick={() => updateQuantity(eachItem.product._id, eachItem.quantity + 1)} className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold">
                      ${eachItem?.product?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 mt-10 w-full mb-10">
              <h2>People are bought</h2>
              <div className="flex flex-row gap-5">
                {Array.isArray(getRecommendedProducts) && getRecommendedProducts.map((eachProduct) => (
                  <RecommendedProductCard key={eachProduct._id} product={eachProduct} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[25%]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 bg-gray-800 p-5 rounded-lg">
                <h2>Order Summary</h2>
                <div className="flex flex-row justify-between items-center">
                  <p>Original Price</p>
                  <p>${total}</p>
                </div>
                <div className="w-full h-[1px] bg-gray-700"></div>
                <div className="flex flex-row justify-between items-center">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                  Proceed to Checkout
                </button>
                <a href="/" className="text-blue-500 text-center">
                  Continue shopping
                </a>
              </div>

              <div className="flex flex-col gap-2 bg-gray-800 p-5 rounded-lg">
                <h2>Do you have a voucher or gift card?</h2>
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="bg-gray-800 text-white px-3 py-1 rounded-lg"
                />
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                  Apply
                </button>
                <h2>Your Available Coupon: </h2>
                {coupon ? (
                  <div className="flex flex-row justify-between items-center">
                    <p>{coupon.name}</p>
                  </div>
                ) : (
                  <p>No coupon available </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
