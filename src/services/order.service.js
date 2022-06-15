const ORDER = require('../models/ORDER.model');
const orderHelper = require('../helpers/order.helper')
const cartHelper = require('../helpers/cart.helper')

exports.getOrderByDateAsync = async(uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, isConfirm: true }).sort({ orderDate: sortType });

        if(orders == null) {
            return {
                message: "Không có thông tin đặt hàng!",
                success: false
            }
        }

        return {
            message: "Danh sách hóa đơn",
            success: true,
            data: orders
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.getNotConfirmOrderByDateAsync = async(uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, isConfirm: false }).sort({ orderDate: sortType });

        if(orders == null) {
            return {
                message: "Không có thông tin đặt hàng!",
                success: false
            }
        }

        return {
            message: "Danh sách hóa đơn",
            success: true,
            data: orders
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.getOrderByTotalPriceAsync = async(uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, isConfirm: true }).sort({ totalPrice: sortType });

        if(orders == null) {
            return {
                message: "Không có thông tin đặt hàng!",
                success: false
            }
        }

        return {
            message: "Danh sách hóa đơn",
            success: true,
            data: orders
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.placeOrderAsync = async(uID, body) => {
    try {
        const { name, phone, location, orderDetail, discount, totalPrice, eID, eName, lat, lng, shipCost } = body;

        var curDate = new Date();
        var newOrder = new ORDER({
            userID: uID,
            name: name,
            phone: phone,
            location: location,
            lat: lat,
            lng: lng,
            enterpriseID: eID,
            enterpriseName: eName,
            orderDetail: orderDetail,
            orderDate: curDate,
            discount: discount,
            totalPrice: totalPrice,
            shipCost: shipCost
        });

        await newOrder.save();
        // const sendMailService = await orderHelper.sendMailToEnterpriseAsync(eID);
        // if(!sendMailService.success) {
        //     return {
        //         message: "Oops! Có lỗi xảy ra",
        //         success: false
        //     }
        // }
        
        return {
            message: "Đặt hàng thành công",
            success: true,
            data: newOrder
        }
    } catch {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.getProductsOrderAsync = async(id) => {
    try {
        const orders = await ORDER.find({
            enterpriseID: id, isConfirm: true
        });

        if(orders == null) {
            return {
                message: "Không có đơn hàng đang chờ",
                success: false
            }
        }

        return {
            message: "Danh sách đơn hàng",
            success: true,
            data: orders
        }

    } catch {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.getNotConfirmProductsOrderAsync = async(id) => {
    try {
        const orders = await ORDER.find({
            enterpriseID: id, isConfirm: false
        });

        if(orders == null) {
            return {
                message: "Không có đơn hàng đang chờ",
                success: false
            }
        }

        return {
            message: "Danh sách đơn hàng",
            success: true,
            data: orders
        }

    } catch {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.confirmOrderAsync = async(body) => {
    try {
        const { oID, shipperID, shipperName } = body
        const order = await ORDER.findOneAndUpdate(
            { _id: oID }, 
            {
                isConfirm: true,
                shipperID: shipperID,
                shipperName: shipperName
            });

        if(order == null) {
            return {
                message: "Có vấn đề khi lấy đơn hàng",
                success: false
            }
        }

        //var sendMailService = await orderHelper.sendMailToCustomerAsync(order.userID, 1)
        clearCartService = await cartHelper.clearCartItemsAsync(order.userID, order.enterpriseID)
        

        // if(!sendMailService.success) {
        //     return {
        //         message: "Oops! Có lỗi xảy ra",
        //         success: false
        //     }
        // }

        if(!clearCartService.success) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }

        return {
            message: "Xác nhận thành công",
            success: true
        }

    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}