import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Middleware
app.use(express.json({limit: "20mb"}));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticsRoutes);

// Serve static files from the React app
if (process.env.NODE_ENV === "production" || process.env.PORT) {
    console.log("Setting up production static file serving...");
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === "production" || process.env.PORT) {
    console.log("Setting up production route handling...");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Static files path: ${path.join(__dirname, "/frontend/dist")}`);
    connectDB();
})



//lKLAUycW1rLPHojJ

//mongodb+srv://doanlyminh2005:lKLAUycW1rLPHojJ@cluster0.guhhnst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

