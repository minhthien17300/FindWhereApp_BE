const productServices = require('../services/product.service');
const controller = require('./message.controller');

exports.addProductAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
        const resServices = await productServices.addProductAsync(id, req.value.body, req.files["images"]);
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

exports.editProductAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await productServices.editProductAsync(id, req.value.body, req.files["images"]);
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
        const resServices = await productServices.findProductByTypeAsync(req.query);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
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

exports.getALLProductAsync = async (req, res, next) =>{
    try {
        const resServices = await productServices.getALLProductAsync();
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			200
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.getProductDetailAsync = async (req, res, next) => {
	try {
        const resServices = await productServices.getProductDetailAsync(req.query.id);
        if(resServices == null) {
            return controller.sendSuccess(res, {}, 404, "Oops! Có lỗi xảy ra!");
		}
		return controller.sendSuccess(
			res,
			resServices,
			200
		);
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.findProductByNameAsync = async (req, res, next) => {
	try {
        const resServices = await productServices.findProductByNameAsync(req.query.name);
        if(!resServices.success) {
            return controller.sendSuccess(res, {}, 404, resServices.message);
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
