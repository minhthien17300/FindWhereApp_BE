const productServices = require('../services/product.service');
const controller = require('./message.controller');

exports.addProductAsync = async (req, res, next) => {
    try {
        const resServices = await productServices.addProductAsync(req.value.body);
        if (!resServices.success) {
			return controller.sendSuccess(res, {}, 400, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			201,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.editProductAsync = async (req, res, next) => {
	try {
		const resServices = await productServices.editProductAsync(req.value.body);
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

exports.deleteProductAsync = async (req, res, next) => {
	try {
		const resServices = await productServices.deleteProductAsync(req.body.id);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 500, resServices.message);
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

exports.findProductByTypeAsync = async (req, res, next) =>{
    try {
        const resServices = await productServices.findProductByTypeAsync(req.value.body);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			302,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getALLProductAsync = async (req, res, next) =>{
    try {
        const resServices = await productServices.getALLProductAsync();
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			302
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getProductDetailAsync = async (req, res, next) => {
	try {
        const resServices = await productServices.getProductDetailAsync(req.body.id);
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			302
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.findProductByNameAsync = async (req, res, next) => {
	try {
        const resServices = await productServices.findProductByNameAsync(req.value.body);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			302,
			resServices.message
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}
