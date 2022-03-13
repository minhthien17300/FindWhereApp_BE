const DISCOUNT = require('../models/DISCOUNT.model');


exports.calculateTotalPriceAfterDiscountAmountAsync = async (id, totalPrice) => {
    const discount = await DISCOUNT.findById(id);
    var bill = totalPrice;
    if(discount.discountType) {
        bill = bill - discount.discountAmount;
    } else {
        bill = bill - bill*discount.discountAmount;
    }

    return bill;
}

