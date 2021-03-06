const cartServices = require('../services/cart.service');
const controller = require('./message.controller');

exports.getCartByEnterpriseAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await cartServices.getCartByEnterpriseAsync(id, req.query.eID);
        if (!resServices.success) {
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

exports.getCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await cartServices.getCartAsync(id);
        if (!resServices.success) {
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

exports.addProductIntoCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await cartServices.addProductIntoCartAsync(id, req.value.body);
        if (!resServices.success) {
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

exports.editProductInCartAsync = async (req, res, next) => {
	try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await cartServices.editProductInCartAsync(id, req.value.body);
        if (!resServices.success) {
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

exports.deleteProductInCartAsync = async (req, res, next) => {
	try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await cartServices.deleteProductInCartAsync(id, req.body.pID);
        if (!resServices.success) {
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

exports.deleteEnterpirseProductInCartAsync = async (req, res, next) => {
	try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await cartServices.deleteEnterpirseProductInCartAsync(id, req.body.eID);
        if (!resServices.success) {
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

