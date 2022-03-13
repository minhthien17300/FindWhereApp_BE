const DISCOUNT = require('../models/DISCOUNT.model');

exports.addDiscountAsync = async ( body ) => {
    try {
        const { dName, dAmount, dType, dCondition, dDate } = body;
        const discount = await DISCOUNT.findOne({ name: dName });
        
        if (discount != null) {
            return {
                message: "Đã tồn tại giảm giá!",
                success: false
            }
        }
        
        const newDiscount = new DISCOUNT({
            name: dName,
            discountAmount: dAmount,
            discountType: dType,
            applyCondition: dCondition,
            expDate: dDate
        });
        await newDiscount.save();
        
        return {
            message: "Đã thêm giảm giá!",
            success: true,
            data: newDiscount
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.editDiscountAsync = async ( body ) => {
    try {
        const { dID, dName, dAmount, dType, dCondition, dDate } = body;
        
        const discount = await DISCOUNT.findOneAndUpdate(
            { _id: dID },
            {   name: dName,
                discountAmount: dAmount,
                discountType: dType,
                applyCondition: dCondition,
                expDate: dDate
            },
            { new: true }
        )
        
        return {
            message: "Đã chỉnh sửa giảm giá!",
            success: true,
            data: discount
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.deleteDiscountAsync = async (dID) => {
    try {
        const discount = await DISCOUNT.findOneAndUpdate(
            { _id: dID },
            { isActive: false},
            { new: true}
        );
        
		return {
            message: "Xóa thành công!",
            success: true,
        }
    } catch (err) {
		console.log(err);
		return {
            message: "Xóa không thành công!",
            success: false
        }
	}
}

exports.getDiscountAsync = async (dID) => {
    try {
        const discount = await DISCOUNT.findOne({ _id: dID });
        return {
            message: "Phiếu giảm giá",
            success: true,
            data: discount
        }
    } catch (err) {
		console.log(err);
		return {
            message: "Oops! Có lỗi xảy ra!",
            success: false
        }
	}
}

exports.getAvalableDiscountAsync = async (uID, totalPrice) => {
    try {
        const curDate = new Date();
        const discounts = await DISCOUNT.find(
            {
                applyCondition: { $gt: totalPrice },
                expDate: { $gte: curDate },
                usedCheck: { $not: { $elemMatch: {uID: uID} } }
            });
        if (discounts != null) {
            return {
                message: "Danh sách giảm giá",
                success: true,
                data: discounts
            }
        } else {
            return {
                message: "Không có giảm giá thỏa điều kiện",
                success: false
            }
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.useDiscountAsync = async (uID, dID) => {
    try {
        const discount = await DISCOUNT.find({
            _id: dID,
            usedCheck: { $elemMatch: {uID: uID} }
        });

        if(discount != null) {
            return {
                message: "Giảm giá đã được sử dụng!",
                success: false
            }
        }

        const usedDiscount = await DISCOUNT.findById(dID);
        const curDate = new Date();
        usedDiscount.usedCheck.push({
            uID: uID,
            usedDate: curDate
        });
        usedDiscount.save();

        return {
            message: "Sử dụng giảm giá thành công!",
            success: true,
            data: usedDiscount
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}
