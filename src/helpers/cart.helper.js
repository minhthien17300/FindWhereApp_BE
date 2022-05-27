const CART = require('../models/CART.model');
const PRODUCT = require('../models/PRODUCT.model')
const USER = require('../models/USERINFO.model');

exports.creatNewCartAsync = async (uID) => {
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

exports.clearCartItemsAsync = async (uID, eID) => {
    try {
        const cart = await CART.findOne({ userID: uID });

        if (cart == null) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }

        var cartClearItems = cart.cartDetail;
        for (var i = 0; i < cartClearItems.length; i++) {
            if(cartClearItems[i].eID == eID){
                cart.cartDetail.splice(i, 1)
                i--;
            }
        }

        var cartClearEnterprise = cart.ListEnterpriseID;
        for (var i = 0; i < cartClearEnterprise.length; i++) {
            if(cartClearEnterprise[i].eID == eID){
                cart.ListEnterpriseID.splice(i, 1)
                i--;
            }
        }

        cart.save();

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

exports.getEnterpirseByProductIDAsync = async (pID) => {
    try {
        const product = await PRODUCT.findById(pID);
        var eID = product.eID;
        const enterprise = await USER.findById(eID);
        return enterprise;
    }
    catch (err) {
        return null;
    }
}
