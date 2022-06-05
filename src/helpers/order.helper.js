const DISCOUNT = require('../models/DISCOUNT.model');
const USER = require('../models/USERINFO.model')
const nodemailer = require('nodemailer');
const { sendMail } = require('../services/sendMail.service');
const { configEnv } = require('../config/config');


exports.calculateTotalPriceAfterDiscountAmountAsync = async (id, totalPrice) => {
    try {
        const discount = await DISCOUNT.findById(id);
        var bill = totalPrice;
        if (discount.discountType) {
            bill = bill - discount.discountAmount;
        } else {
            bill = bill - bill * discount.discountAmount;
        }

        return bill;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

exports.sendMailToEnterpriseAsync = async (sID) => {
    try {
        const enterprise = await USER.findById(sID);
        
        if(enterprise == null) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }

        const mailOptions = {
            to: enterprise.email,
            from: configEnv.Email,
            subject: 'Đơn đặt hàng từ FindWhere',
            text:   'Bạn vừa có khách đặt hàng tại ứng dụng FindWhere!\n'+
                    'Bạn vui lòng mở ứng dụng để xem chi tiết đơn đặt hàng và xác nhận giao hàng!\n'
        };
        const resultSendMail = await sendMail(mailOptions);
        console.log(resultSendMail);
        if (!resultSendMail) {
            return {
                message: 'Gửi mail không thành công!',
                success: false
            };
        } else {
            return {
                message: 'Gửi mail thành công!',
                success: true
            };
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

exports.sendMailToCustomerAsync = async (uID, type) => {
    try {
        const user = await USER.findById(uID);
        
        if(user == null) {
            return {
                message: "Oops! Có lỗi xảy ra",
                success: false
            }
        }
        
        var text;
        //type = 0 means reject
        if(type == 0) {
            text = "Đơn hàng của bạn đã bị từ chối, vui lòng đặt đơn khác!\n"+
                    "Chân thành xin lỗi bạn về sự bất tiện!"
        } else {
            text = "Đơn hàng của bạn đã được xác nhận, hàng sẽ được chuyển trong giây lát!\n"+
                    "Chân thành cảm ơn bạn đã xử dụng dịch vụ <3"
        }

        const mailOptions = {
            to: user.email,
            from: configEnv.Email,
            subject: 'Đơn đặt hàng từ FindWhere',
            text: text
        };
        const resultSendMail = await sendMail(mailOptions);
        console.log(resultSendMail);
        if (!resultSendMail) {
            return {
                message: 'Gửi mail không thành công!',
                success: false
            };
        } else {
            return {
                message: 'Gửi mail thành công!',
                success: true
            };
        }
    } catch (err) {
        console.log(err);
        return {
            message: "Internal Server Error",
            success: false
        }
    }
}

