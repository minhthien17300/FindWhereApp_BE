const joi = require('@hapi/joi');
const schemas = {
	addProduct: joi.object().keys({
		name: joi.string().required(),
		price: joi.string().required(),
		types: joi.array().required(),
		description: joi.string().required()
	}),
	editProduct: joi.object().keys({
		id: joi.string().required(),
		name: joi.string().required(),
		price: joi.string().required(),
		types: joi.array().required(),
		description: joi.string().required()
	}),
	/* findProductByType: joi.object().keys({
        types: joi.array().required()
    }),
	findProductByName: joi.object().keys({
		name: joi.string().required()
	}), */
};
module.exports = schemas;