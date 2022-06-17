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

exports.getNotConfirmOrderByDateAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.getNotConfirmOrderByDateAsync(id, req.query.sortType);
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
		const resServices = await orderServices.placeOrderAsync(id, req.body);
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

exports.paymentConfirmAsync = async (req, res, next) => {
	try {
		const resServices = await orderServices.paymentConfirmAsync(req.body.id);
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


exports.getProductsOrderAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.getProductsOrderAsync(id);
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

exports.getNotConfirmProductsOrderAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.getNotConfirmProductsOrderAsync(id);
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
		const resServices = await orderServices.confirmOrderAsync(req.body);
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

exports.placeOrderAsync2 = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		var ipAddr =
			req.headers["x-forwarded-for"] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
		const resServices = await orderServices.placeOrderAsync2(id, req.body, ipAddr);
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

exports.confirmShipperOrderAsync = async (req, res, next) => {
	try {
		const resServices = await orderServices.confirmShipperOrderAsync(req.body.oID);
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

exports.GetShipperOrderAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.GetShipperOrderAsync(id);
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

exports.getOrderByIdAsync = async (req, res, next) => {
	try {
		const resServices = await orderServices.getOrderByIdAsync(req.query.oID);
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

exports.GetShipperConfirmOrderAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.GetShipperConfirmOrderAsync(id);
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

exports.GetUserOnTheWayOrderAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await orderServices.GetUserOnTheWayOrderAsync(id);
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