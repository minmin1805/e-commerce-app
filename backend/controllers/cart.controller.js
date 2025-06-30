import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        // 1. Get all product IDs from cartItems
        const productIds = req.user.cartItems.map(item => item._id);
        const products = [];
        for(const productId of productIds) {
            const product = await Product.findById(productId);
            products.push(product);
        }

        const cartWithProducts = req.user.cartItems.map(item => {
            const product = products.find(p => p._id.toString() === item._id.toString());
            return {
                quantity: item.quantity,
                product: product || null
            };
        });

        res.json(cartWithProducts);
    } catch (error) {
        console.log("Error in getting all products", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId);

        if(existingItem){
            existingItem.quantity += 1;
        }
        else {
            user.cartItems.push(productId)
        }

        await user.save();
        res.json(user.cartItems);
        console.log("Product added to cart");
    } catch (error) {
        console.log("Error in adding product to cart", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        
        const {productId} = req.body;
        const user = req.user;
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        res.json(user.cartItems);
        console.log("Product removed from cart");
    } catch (error) {
        console.log("Error in removing product from cart", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const updateQuantity =async  (req, res) => {
    try {

        const {productId, quantity} = req.body;
        console.log("productId", productId);
        console.log("quantity", quantity);
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item._id.toString() === productId);

        if(existingItem) {
            existingItem.quantity = quantity;
        }
        await user.save();
        res.json(user.cartItems);
        console.log("Product quantity updated");
    } catch (error) {
        console.log("Error in updating product quantity in cart", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        console.log("productId", productId);
        console.log("body", req.body);
        const user = req.user;
        const updatedCart = user.cartItems.filter((item) => item._id.toString() !== productId);
        // console.log("updatedCart", updatedCart);
        user.cartItems = updatedCart;
        await user.save();
        res.json(user.cartItems);
        console.log("Product removed from cart");
    } catch (error) {
        console.log("Error in removing product from cart", error.message);
    }
}