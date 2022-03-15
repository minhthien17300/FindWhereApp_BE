const CART = require('../models/CART.model');

exports.creatNewCartAsync = async(uID) => {
    try {
        const newCart = new CART({
            userID: uID
        });
        await newCart.save();
        return {
            success: true
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Oops! Có lỗi xảy ra!",
            success: false
        }
    }
}