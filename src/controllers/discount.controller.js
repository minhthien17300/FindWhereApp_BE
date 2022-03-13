const discountServices = require('../services/discount.service');
const controller = require('./message.controller');

exports.addDiscountAsync = async (req, res, next) => {
    try {
        const resServices = await discountServices.addDiscountAsync(req.value.body);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.editDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await discountServices.editDiscountAsync(req.value.body);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.deleteDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await discountServices.deleteDiscountAsync(req.body.dID);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await discountServices.getDiscountAsync(req.body.dID);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getAvalableDiscountAsync = async (req, res, next) => {
	try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await discountServices.getAvalableDiscountAsync(id, req.body.totalPrice);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.useDiscountAsync = async (req, res, next) => {
	try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await discountServices.useDiscountAsync(id, req.body.dID);
        if (resServices.length == 0) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}