const CART = require('../models/CART.model');

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
        const { pID, pName, pAmount, pPrice, pImage } = body;
        const cart = await CART.findOne({ userID: uID });
        
        var add = true;
        /* cart.cartDetail.forEach(element => {
            if(element.pID === pID) {
                element.pAmount = element.pAmount + 1;
                element.pTotal = element.pPrice*element.pAmount;
                add = false;
            }
        }); */

        var i = 0;
        while(i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if(i<cart.cartDetail.length) {
            add = false;
            var tempAmount = cart.cartDetail[i].pAmount + 1;
            var tempCart = cart.cartDetail[i];
            tempCart.pAmount = tempAmount;
            tempCart.pTotal = tempCart.pPrice*tempAmount;
            cart.totalPrice = cart.totalPrice + tempCart.pPrice;
            cart.cartDetail.splice(i,1,tempCart);
        }

        if(add) {
            cart.cartDetail.push({
                pID: pID,
                pName: pName,
                pAmount: pAmount,
                pPrice: pPrice,
                pImage: pImage,
                pTotal: pPrice*pAmount
            });
            cart.totalPrice = cart.totalPrice + cart.cartDetail[cart.cartDetail.length-1].pTotal;
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

exports.editProductInCartAsync = async(uID, body) => {
    try {
        const { pID, pAmount } = body;
        const cart = await CART.findOne({ userID: uID });

        var i = 0;
        while(i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if(i<cart.cartDetail.length) {
            var tempPTotal = cart.cartDetail[i].pTotal;
            var tempCart = cart.cartDetail[i];
            tempCart.pAmount = pAmount;
            tempCart.pTotal = tempCart.pPrice*pAmount;
            cart.totalPrice = cart.totalPrice - tempPTotal + tempCart.pTotal;
            cart.cartDetail.splice(i,1,tempCart);
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

exports.deleteProductInCartAsync = async(uID, pID) => {
    try {
        const cart = await CART.findOne({ userID: uID });

        var i = 0;
        while(i < cart.cartDetail.length && cart.cartDetail[i].pID != pID) {
            i++;
        }

        if(i<cart.cartDetail.length) {
            cart.totalPrice = cart.totalPrice - cart.cartDetail[i].pTotal;
            cart.cartDetail.splice(i,1);
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