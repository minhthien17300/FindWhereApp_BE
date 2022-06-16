const ORDER = require('../models/ORDER.model');
const orderHelper = require('../helpers/order.helper')
const cartHelper = require('../helpers/cart.helper')

exports.getOrderByDateAsync = async (uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, status: 2 }).sort({ orderDate: sortType });

        if (orders == null) {
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

exports.getNotConfirmOrderByDateAsync = async (uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, status: 0 }).sort({ orderDate: sortType });

        if (orders == null) {
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

exports.getOrderByTotalPriceAsync = async (uID, sortType) => {
    try {
        //sortType = -1 means descending, 1 means ascending
        const orders = await ORDER.find({ userID: uID, status: 2 }).sort({ totalPrice: sortType });

        if (orders == null) {
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

exports.placeOrderAsync = async (uID, body) => {
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
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.paymentConfirmAsync = async (id) => {
    try {
        const order = await ORDER.findById({ _id: id });
        order.isOnlinePayment = true;
        await order.save();
        return {
            success: true,
            message: "success"
        }
    }
    catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.getProductsOrderAsync = async (id) => {
    try {
        const orders = await ORDER.find({
            enterpriseID: id, status: 2
        });

        if (orders == null) {
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

exports.getNotConfirmProductsOrderAsync = async (id) => {
    try {
        const orders = await ORDER.find({
            enterpriseID: id, status: 0
        });

        if (orders == null) {
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

exports.confirmOrderAsync = async (body) => {
    try {
        const { oID, shipperID, shipperName } = body
        const order = await ORDER.findOneAndUpdate(
            { _id: oID },
            {
                status: 1,
                shipperID: shipperID,
                shipperName: shipperName
            });

        if (order == null) {
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

        if (!clearCartService.success) {
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


exports.placeOrderAsync2 = async (uID, body, ipAddr) => {
    try {
        const { name, phone, location, orderDetail, discount, totalPrice, eID, eName, lat, lng, shipCost, payType } = body;

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

        if (payType == 1) {
            var finalpayment = totalPrice;
            var tmnCode = "CHY6OPJR";
            var secretKey = "PMIMRINOXGCPYUKQAHXXLTPSKDMGCPED";
            var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            var returnUrl = `https://bill-page.vercel.app/payment?id=${newOrder._id}`;
            var date = new Date();

            var createDate =
                date.getFullYear() +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                ("0" + date.getDate()).slice(-2) +
                ("0" + date.getHours()).slice(-2) +
                ("0" + date.getMinutes()).slice(-2) +
                ("0" + date.getSeconds()).slice(-2);
            var orderId = createDate.slice(8, 14);
            var amount = finalpayment;
            var bankCode = "NCB";
            var orderInfo = name;
            var orderType = "other";
            var locale = "vn";

            var currCode = "VND";
            var vnp_Params = {};
            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = tmnCode;
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params["vnp_Locale"] = locale;
            vnp_Params["vnp_CurrCode"] = currCode;
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] = orderInfo;
            vnp_Params["vnp_OrderType"] = orderType;
            vnp_Params["vnp_Amount"] = amount * 100;
            vnp_Params["vnp_ReturnUrl"] = returnUrl;
            vnp_Params["vnp_IpAddr"] = ipAddr;
            vnp_Params["vnp_CreateDate"] = createDate;
            if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
            }

            vnp_Params =orderHelper.sortObject(vnp_Params);

            var querystring = require("qs");
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var crypto = require("crypto");
            var hmac = crypto.createHmac("sha512", secretKey);
            var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
        }
        return {
            message: "Đặt hàng thành công",
            success: true,
            data: vnpUrl
        }

    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.GetShipperOrderAsync = async(sID) => {
    try {
        const orders = await ORDER.find({
            shipperID: sID, status: 1
        });

        if (orders == null) {
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
    }
    catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.confirmShipperOrderAsync = async (oID) => {
    try {
        
        const order = await ORDER.findOneAndUpdate(
            { _id: oID },
            {
                status: 2
            });

        if (order == null) {
            return {
                message: "Có vấn đề khi lấy đơn hàng",
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

exports.getOrderByIdAsync = async (id) => {
    try {
        const order = await ORDER.findById({ _id: id });

        if (order == null) {
            return {
                message: "Không có đơn hàng",
                success: false
            }
        }

        return {
            message: "đơn hàng",
            success: true,
            data: order
        }

    } catch {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}