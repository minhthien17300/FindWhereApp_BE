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

exports.clearCartItemsAsync = async(uID) => {
    try {
        const cart = await CART.findOneAndUpdate(
            { userID: uID },
            {
                cartDetail: [],
                totalPrice: 0
            },
            { new: true }
        );

        if (cart == null) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }

        return {
            message: "success",
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