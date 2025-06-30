import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in: req.user.cartItems}});
        
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find(item => item.id === product._id);
            return {...product.toJSON(), quantity: item.quantity}
        })

        res.json(cartItems);
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
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item) => item.id === productId);
        
        if(existingItem) {
            if(quantity == 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }
            existingItem.quantity = quantity;
            await user.save();
            return res.json(user.cartItems);
                }
                else {
                    return res.status(404).json({ message: "Product not found in cart" });
                }
    } catch (error) {
        console.log("Error in updating product quantity in cart", error.message);
        res.status(500).json({ message: error.message });
    }
}