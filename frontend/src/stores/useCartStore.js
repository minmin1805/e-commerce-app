import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	total: 0,
	coupon: null,
	subtotal: 0,

    getAllCartItems: async () => {
        try {
            const foundCartItems = await axios.get("/cart");
            console.log("foundCartItems", foundCartItems.data);
            set({cart: foundCartItems.data});
            get().calculateTotal();
        } catch (error) {
            set({cart: []});
            toast.error("Error in getting cart items");
            console.log("Error in getting cart items", error.message);
        }
    },
    addToCart: async (product) => {
        try {
            console.log("product id", product._id);
            const updatedCart = await axios.post("/cart", {productId: product._id});
            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem ? prevState.cart.map((item) => 
                    item._id === product._id ? {...item, quantity: item.quantity + 1} : item) : [...prevState.cart, {...product, quantity: 1}];
                return {cart: newCart};
            })
            get().calculateTotal();
        } catch (error) {
            toast.error("Error in adding product to cart");
            console.log("Error in adding product to cart", error.message);
        }
    },
    calculateTotal: () => {
        const {cart, coupon} = get();
        const subtotal = cart.reduce((acc, item) => acc + item?.product?.price * item?.quantity, 0);
        let total = subtotal;
        if(coupon){
            total = subtotal - (subtotal * (coupon.discountPercentage / 100));
        }
        set({subtotal, total});
        return {subtotal, total, coupon};
    },
    removeFromCart: async (productId) => {
        try {
            await axios.delete(`/cart/`, { data: { productId } });
            toast.success("Product removed from cart");
            await get().getAllCartItems();
            get().calculateTotal();
        } catch (error) {
            toast.error("Error in removing product from cart");
            console.log("Error in removing product from cart", error.message);
        }
    },

    updateQuantity: async (productId, quantity) => {
        try {
            await axios.put(`/cart/`, {productId, quantity});
            toast.success("Quantity updated");
            await get().getAllCartItems();
            get().calculateTotal();
        } catch (error) {
            toast.error("Error in updating quantity");
            console.log("Error in updating quantity", error.message);
        }
    },
    clearCart: () => {
        set({cart: [], total: 0, coupon: null, subtotal: 0});
    },
 
}));