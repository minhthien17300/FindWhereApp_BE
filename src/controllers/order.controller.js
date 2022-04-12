const orderServices = require('../services/order.service');
const controller = require('../controllers/message.controller');
const jwtServices = require('../services/jwt.service');

exports.getOrderByDateAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await orderServices.getOrderByDateAsync(id, req.query.sortType);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getOrderByTotalPriceAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await orderServices.getOrderByTotalPriceAsync(id, req.query.sortType);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.placeOrderAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await orderServices.placeOrderAsync(id, req.value.body);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getShipperOrderAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await orderServices.getShipperOrderAsync(id);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.confirmOrderAsync = async (req, res, next) => {
    try {
		
        const resServices = await orderServices.getOrderByDateAsync(req.body.oID, req.body.type);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}