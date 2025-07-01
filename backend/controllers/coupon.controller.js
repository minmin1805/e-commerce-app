import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({userId: req.user._id, isActive: true});
        res.json(coupon);

    } catch (error) {
        console.log("Error in get coupon controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const {code} = req.body;
        console.log("code", code);
        const coupon = await Coupon.findOne({code: code, isActive: true});
        console.log("coupon", coupon);
        if(!coupon){
            return res.status(404).json({ message: "Coupon not found or expired" });
        }

        if(coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ message: "Coupon expired" });
        }

        res.json({
            message: "Coupon valid and applied",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log("Error in validate coupon controller", error.message);
        res.status(500).json({ message: error.message });
    }
}