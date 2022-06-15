const joi = require('@hapi/joi');
const schemas = {
	placeOrder: joi.object().keys({
		name: joi.string().required(), 
        phone: joi.string().length(10).pattern(/^[0-9]+$/).required(), 
        location: joi.string().required(),
        lat: joi.number(),
        lng: joi.number(), 
        orderDetail: joi.array().required(), 
        eID: joi.string().required(),
        eName: joi.string().required(), 
        discount: joi.number(),
        shipCost: joi.number(),
        totalPrice: joi.number(),
	}),
};
module.exports = schemas;