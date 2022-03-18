const ORDER = require('../models/ORDER.model');
const orderHelper = require('../helpers/order.helper')

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
        const { name, phone, location, orderDetail, shipperID, discount, totalPrice } = body;

        var curDate = new Date();
        var newOrder = new ORDER({
            userID: uID,
            name: name,
            phone: phone,
            location: location,
            orderDetail: orderDetail,
            orderDate: curDate,
            shipperID: shipperID,
            discount: discount,
            totalPrice: totalPrice
        });

        await newOrder.save();
        const sendMailService = await orderHelper.sendMailToShipperAsync(shipperID);
        if(!sendMailService.success) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }
        
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

exports.getShipperOrderAsync = async(sID) => {
    try {
        const orders = await ORDER.find({
            shipperID: sID
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

exports.confirmOrderAsync = async(oID, type) => {
    try {
        const order = ORDER.findById(oID);

        if(order == null) {
            return {
                message: "Có vấn đề khi lấy đơn hàng",
                success: false
            }
        }

        //type = 1 means confirm order, else means not
        var sendMailService;
        if(type == 1) {
            order.isConfirm = true;
            await order.save();
            sendMailService = await orderHelper.sendMailToCustomerAsync(order.userID, 1)
        } else {
            sendMailService = await orderHelper.sendMailToCustomerAsync(order.userID, 2)
        }

        if(!sendMailService.success) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }

        return {
            message: "Xác nhận thành công",
            success: true
        }

    } catch {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}