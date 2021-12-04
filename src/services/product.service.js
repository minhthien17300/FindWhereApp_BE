const PRODUCT = require("../models/PRODUCT.model");
const { string, array } = require('@hapi/joi');
const { $where } = require("../models/PRODUCT.model");
const { query } = require("express");
const uploadImageHelper = require('../helper/uploadImage.helper');

exports.addProductAsync = async (eID, body, images) => {
    try {
        const { name, price, types } = body;
        const productExist = await PRODUCT.findOne({ 
            eID: eID,
            name: name 
        });
        if(productExist) {
            return {
                message: "Product đã tồn tại!",
                success: false
            };
        };

        const urlList = await uploadImageHelper.uploadImageAsync(images, name);

        const newProduct = new PRODUCT({
            eID: eID,
            name: name,
            price: price,
            types: types,
            images: urlList
        });
        await newProduct.save();
        return {
            message: "Tạo thành công!",
            success: true,
            data: newProduct
        }
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.editProductAsync = async ( eID, body, images ) => {
    try {
        const { id, name, price, types } = body;

        const urlList = await uploadImageHelper.uploadImageAsync(images, name);

        const product = await PRODUCT.findOneAndUpdate(
			{ _id: id },
			{ 
                eID: eID,
				name: name,
				price: price,
				types: types,
                images: urlList
			},
			{ new: true }
		);
		if (product != null) {
			return {
			message: 'Đổi thông tin thành công!',
			success: true,
            data: product
			};
		}
		else {
			return {
				message: "Đổi thông tin không thành công!",
				success: false
			};
		};
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.deleteProductAsync = async (id) => {
    try {
        const product = await PRODUCT.deleteOne({ _id: id });
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

exports.findProductByTypeAsync = async body => {
    try {
        const { types } = body;
        const products = await PRODUCT.find({
            types: { $in: types }
        });
        if(products.length != 0) {
            return {
            message: "Danh sách product!",
            success: true,
            data: products
            }
        } else {
            return {
                message: "Không tìm thấy product!",
                success: false
            }
        }
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.getALLProductAsync = async () => {
    try {
        const products = await PRODUCT.find();
        return products;
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.getProductDetailAsync = async (id) => {
    try {
        const product = await PRODUCT.findById({ _id: id });
        return product;
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.findProductByNameAsync = async (name) => {
    try {
        var nameRegex = new RegExp(name)
        const products = await PRODUCT.find({name :{$regex: nameRegex, $options: 'i'}});
        if(products.length == 0) {
            return {
                message: "Không tìm thấy Product!",
                success: false
            }
        } else {
            return {
                message: "Danh sách Product",
                success: true,
                data: products
            }
        }
    } catch (err) {
		console.log(err);
		return null;
	}
}