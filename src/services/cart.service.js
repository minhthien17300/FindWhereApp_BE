//const { isEmailIdentifier } = require('firebase-admin/lib/auth/identifier');
const CART = require('../models/CART.model');
const cartHelper = require('../helpers/cart.helper');

exports.getCartByEnterpriseAsync = async (uID, eID) => {
    try {
        const cart = await CART.findOne({ userID: uID });
        if (cart == null) {
            return {
                message: "Oops! Có lỗi xảy ra!",
                success: false
            }
        }
        if (cart.cartDetail.length === 0) {
            return {
                message: "Bạn chưa có gì trong giỏ hàng, hãy chọn vài món hàng!",
                success: true,
                data: cart
            }
        }

        var cartByEnterprise = [];
        for (var i = 0; i < cart.cartDetail.length; i++) {
            if (cart.cartDetail[i].eID == eID) {
                cartByEnterprise.push(cart.cartDetail[i]);
            }
        }

        return {
            message: "success",
            success: true,
            data: cartByEnterprise
        }

    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error!",
            success: false
        }
    }
}

exports.getCartAsync = async (uID) => {
    try {
        const cart = await CART.findOne({ userID: uID });
        if (cart == null) {
            return {
                message: "Oops! Có lỗi xảy ra!",
                success: false
            }
        }
        if (cart.cartDetail.length === 0) {
            return {
                message: "Bạn chưa có gì trong giỏ hàng, hãy chọn vài món hàng!",
                success: true,
                data: cart
            }
        }

        return {
            message: "success",
            success: true,
            data: cart
        }

    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error!",
            success: false
        }
    }
}

exports.addProductIntoCartAsync = async (uID, body) => {
    try {
        const { pID, pName, pAmount, pPrice, pImage, isLarge } = body;
        const cart = await CART.findOne({ userID: uID });

        var add = true;

        var i = 0;
        while (i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if (i < cart.cartDetail.length) {
            add = false;
            var tempAmount = cart.cartDetail[i].pAmount + 1;
            var tempCart = cart.cartDetail[i];
            tempCart.pAmount = tempAmount;
            tempCart.pTotal = tempCart.pPrice * tempAmount;
            cart.totalPrice = cart.totalPrice + tempCart.pPrice;
            cart.cartDetail.splice(i, 1, tempCart);
        }

        if (add) {
            var enterprise = await cartHelper.getEnterpirseByProductIDAsync(pID);
            var j = 0;
            while (j < cart.ListEnterpriseID.length && cart.ListEnterpriseID[j].eID != enterprise._id) {
                j++;
            }
            if (j == cart.ListEnterpriseID.length) {
                cart.ListEnterpriseID.push({
                    eID: enterprise._id.toString(),
                    eName: enterprise.name
                });
            }
            cart.cartDetail.push({
                pID: pID,
                eID: enterprise._id.toString(),
                pName: pName,
                pAmount: pAmount,
                isLarge: isLarge,
                pPrice: pPrice,
                pImage: pImage,
                pTotal: pPrice * pAmount
            });
            cart.totalPrice = cart.totalPrice + cart.cartDetail[cart.cartDetail.length - 1].pTotal;
        }



        await cart.save();
        return {
            message: "Thêm thành công!",
            success: true,
            data: cart
        }

    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error!",
            success: false
        }
    }
}

exports.editProductInCartAsync = async (uID, body) => {
    try {
        const { pID, pAmount } = body;
        const cart = await CART.findOne({ userID: uID });

        var i = 0;
        while (i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if (i < cart.cartDetail.length) {
            var tempPTotal = cart.cartDetail[i].pTotal;
            var tempCart = cart.cartDetail[i];
            tempCart.pAmount = pAmount;
            tempCart.pTotal = tempCart.pPrice * pAmount;
            cart.totalPrice = cart.totalPrice - tempPTotal + tempCart.pTotal;
            cart.cartDetail.splice(i, 1, tempCart);
        }

        await cart.save();
        return {
            message: "success",
            success: true,
            data: cart
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.deleteProductInCartAsync = async (uID, pID) => {
    try {
        const cart = await CART.findOne({ userID: uID });

        var i = 0;
        while (i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if (i < cart.cartDetail.length) {
            var eID = cart.cartDetail[i].eID;
            cart.totalPrice = cart.totalPrice - cart.cartDetail[i].pTotal;
            cart.cartDetail.splice(i, 1);
            var j = 0;
            while (j < cart.cartDetail.length && cart.cartDetail[j].eID != eID) {
                j++;
            }

            if (j == cart.cartDetail.length) {
                var k = 0;
                while (k < cart.ListEnterpriseID.length && cart.ListEnterpriseID[k].eID != eID) {
                    k++;
                }

                if (k < cart.ListEnterpriseID.length) {
                    cart.ListEnterpriseID.splice(k, 1);
                }
            }
        }

        await cart.save();
        return {
            message: "Xóa thành công!",
            success: true,
            data: cart
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.deleteEnterpirseProductInCartAsync = async (uID, eID) => {
    try {
        const cart = await CART.findOne({ userID: uID });

        for (var i = 0; i < cart.cartDetail.length; i++) {
            if (cart.cartDetail[i].eID == eID) {
                cart.totalPrice = cart.totalPrice - cart.cartDetail[i].pTotal;
                cart.cartDetail.splice(i, 1);
                i--;
            }
        }

        var k = 0;
        while (k < cart.ListEnterpriseID.length && cart.ListEnterpriseID[k].eID != eID) {
            k++;
        }

        if (k < cart.ListEnterpriseID.length) {
            cart.ListEnterpriseID.splice(k, 1);
        }



        await cart.save();
        return {
            message: "Xóa thành công!",
            success: true,
            data: cart
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}