import React, { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { FaTrashAlt } from "react-icons/fa";
import RecommendedProductCard from "../components/RecommendedProductCard";
import axios from "../lib/axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import ProductCard from "../components/ProductCard";

function CartPage() {
  const stripePromise = loadStripe(
    "pk_test_51RU0UdEKdPO6nAqzZRoZgwQTvjfaD0a1FduNQ3hfCEGkqhTM0P4TifpUhvxrzqKtPBjL495URB9WGm8rPsYLRJXL0003wj5xA3"
  );

  const {
    cart,
    total,
    coupon,
    subtotal,
    removeFromCart,
    updateQuantity,
    getMyCoupon,
    applyCoupon,
    removeCoupon,
    isCouponApplied,
  } = useCartStore();
  const [getRecommendedProducts, setGetRecommendedProducts] = useState([]);
  const [userCoupon, setUserCoupon] = useState("");

  // console.log("cart", cart);
  console.log("total", total);
  // console.log("coupon", coupon);
  // console.log("subtotal", subtotal);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const response = await axios.get(`/products/recommendation`);
      setGetRecommendedProducts(response.data);
    };
    fetchRecommendedProducts();
  }, [cart]);

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) {
      setUserCoupon(coupon.code);
      // console.log("userCoupon", userCoupon);
    }
  }, [coupon]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await axios.post(`/payments/create-checkout-session`, {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    const session = response.data;
    console.log("session", session);

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast.error("Error in redirecting to checkout");
      console.log("error:", result.error);
    }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserCoupon("");
  };

  const handleApplyCoupon = () => {
    if (userCoupon) {
      applyCoupon(userCoupon);
    } else {
      toast.error("Please enter a coupon code");
    }
  };

  return (
    <div className="min-h-screen flex flex-row gap-10 pt-20 bg-[#FFF8F3]">
      {cart.length === 0 ? (
        <div className="flex flex-col gap-5">
          <h1>Your cart is empty</h1>
          <a href="/" className="text-blue-500 text-center">
            Continue shopping
          </a>
        </div>
      ) : (
        <>
          {/* Left Side - Cart Items */}
          <div className="w-[60%] flex flex-col mt-10 ml-15">
            <h2 className="text-4xl font-bold text-[#BF360C] mb-8">
              Your Shopping Cart
            </h2>
            <div
              className="bg-white rounded-3xl shadow-md p-10 w-full"
              style={{ border: "1px solid #FFCCBC" }}
            >
              {cart?.map((eachItem, idx) => (
                <React.Fragment key={eachItem.product._id}>
                  <div className="flex flex-row items-center justify-between mb-8">
                    {/* Product Image/Placeholder */}
                    <div className="bg-[#FFE0B2] rounded-xl flex items-center justify-center w-[170px] h-[170px] mr-8">
                      {eachItem?.product?.image ? (
                        <img
                          src={eachItem?.product?.image}
                          alt={eachItem?.product?.name}
                          className="object-cover rounded-lg w-[150px] h-[150px]"
                        />
                      ) : (
                        <span className="text-[#BF360C] text-lg font-bold">
                          [Product]
                        </span>
                      )}
                    </div>
                    {/* Product Details */}
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-[#BF360C] mb-2">
                        {eachItem?.product?.name}
                      </h2>
                      <p className="text-2xl text-[#8D6E63] mb-4 mt-5">
                        {eachItem?.product?.description}
                      </p>
                    </div>
                    {/* Quantity Controls & Price */}
                    <div className="flex flex-col items-end gap-2 min-w-[180px]">
                      <div className="flex flex-row items-center bg-[#FFF3E0] rounded-full px-4 py-2 mb-2">
                        <button
                          onClick={() =>
                            eachItem.quantity === 1
                              ? removeFromCart(eachItem.product._id)
                              : updateQuantity(
                                  eachItem.product._id,
                                  eachItem.quantity - 1
                                )
                          }
                          className="text-[#BF360C] text-2xl px-2"
                        >
                          -
                        </button>
                        <span className="mx-2 text-lg font-bold text-[#BF360C]">
                          {eachItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              eachItem.product._id,
                              eachItem.quantity + 1
                            )
                          }
                          className="text-[#BF360C] text-2xl px-2"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-2xl font-bold text-[#BF360C] mr-7 mt-1">
                        ${eachItem?.product?.price}
                      </span>

                      <button
                        onClick={() => removeFromCart(eachItem?.product?._id)}
                        className="text-[#FF8A65] hover:underline ml-2 text-md font-semibold mt-7"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {idx !== cart.length - 1 && (
                    <hr className="border-t border-[#FFCCBC] my-2" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col gap-5 mt-30 w-full mb-10">
              <h2 className="text-3xl font-bold text-[#BF360C] mb-2">
                People are bought
              </h2>
              <div className="flex flex-row gap-5">
                {Array.isArray(getRecommendedProducts) &&
                  getRecommendedProducts.map((eachProduct) => (
                    <ProductCard key={eachProduct._id} product={eachProduct} />
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary & Voucher */}
          <div className="w-[30%] flex flex-col gap-6 mt-10">
            {/* Order Summary */}
            <div
              className="rounded-3xl p-8 shadow-md"
              style={{
                background: "linear-gradient(135deg, #FFE0B2 0%, #FFCCBC 100%)",
                border: "1px solid #FFCCBC",
              }}
            >
              <h2 className="text-3xl font-bold text-[#BF360C] mb-4">
                Order Summary
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-2xl text-[#8e290a76]">Original Price</p>
                  <p>${subtotal}</p>
                </div>
                {isCouponApplied && (
                  <>
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-2xl text-[#8e290a76]">Savings</p>
                      <p>-${subtotal - total}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full h-[1px] bg-[#FFCCBC] my-4"></div>
              <div className="flex flex-row justify-between items-center">
                <span className="text-2xl font-bold text-[#BF360C]">Total</span>
                <span className="text-2xl font-bold text-[#BF360C]">
                  ${total}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full mt-6 py-3 rounded-full bg-[#BF360C] text-white text-xl font-bold hover:bg-[#FF8A65] transition"
              >
                Proceed to Checkout
              </button>
              <a
                href="/"
                className="block text-center text-[#FF8A65] hover:underline text-xl mt-5"
              >
                Continue Shopping
              </a>
            </div>

            {/* Voucher Section */}
            <div
              className="rounded-3xl p-8 shadow-md mt-6"
              style={{
                background: "linear-gradient(135deg, #FFE0B2 0%, #FFCCBC 100%)",
                border: "1px solid #FFCCBC",
              }}
            >
              <h2 className="text-2xl font-bold text-[#BF360C] mb-2">
                Do you have a voucher or gift card?
              </h2>
              <input
                type="text"
                placeholder="Enter voucher code"
                className="w-full bg-[#FFE0B2] border border-[#FFCCBC] rounded-full px-4 py-2 text-[#BF360C] mb-2"
                value={userCoupon}
                onChange={(e) => setUserCoupon(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className=" text-xl w-full py-2 rounded-full bg-[#FF8A65] text-white font-bold hover:bg-[#BF360C] transition mb-2"
              >
                Apply
              </button>
              <h2 className="text-xl font-bold text-[#BF360C] mb-1 mt-5">
                Your Available Coupon:{" "}
              </h2>
              {isCouponApplied && (
                <p className="text-xl mt-3">
                  {coupon?.code} - {coupon?.discountPercentage}% off
                </p>
              )}
              {coupon ? (
                <div className="flex flex-row justify-between items-center mt-2">
                  <p>{coupon.name}</p>
                  {isCouponApplied ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-[#FF8A65] text-white px-3 py-1 rounded-full hover:bg-[#BF360C] transition text-xl"
                    >
                      Remove
                    </button>
                  ) : (
                    <p>No coupon applied</p>
                  )}
                </div>
              ) : (
                <p>No coupon available </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
