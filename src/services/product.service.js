const PRODUCT = require("../models/PRODUCT.model");
const { string, array } = require('@hapi/joi');
const { $where } = require("../models/PRODUCT.model");
const { query } = require("express");
const uploadImageHelper = require('../helpers/uploadImage.helper');
const userHelper = require('../helpers/user.helper');

exports.addProductAsync = async (eID, body, images) => {
    try {
        const { name, price, types, description } = body;
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
            description: description,
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
        const { id, name, price, types, description } = body;

        const urlList = await uploadImageHelper.uploadImageAsync(images, name);

        const product = await PRODUCT.findOneAndUpdate(
			{ _id: id },
			{ 
                eID: eID,
				name: name,
				price: price,
                description: description,
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
        const product = await PRODUCT.findOneAndUpdate({ _id: id }, {isDeleted: true});
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
        }).sort({score: -1});
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
        const products = await PRODUCT.find({name :{$regex: nameRegex, $options: 'i'}}).sort({score: -1});
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

exports.getProductSortAsync = async () => {
    try {
        const products = await PRODUCT.find({isDeleted: false}).sort({score: -1});
        return products;
    } catch (err) {
		console.log(err);
		return null;
	}
};

exports.getEnterpriseProductSortAsync = async (id) => {
    try {
        const enterpriseInfo = userHelper.getEnterpriseInfoAsync(id);

        if(enterpriseInfo == null) {
            return {
                success: false,
                message: "Không lấy được thông tin doanh nghiệp",
                data: ""
            }
        }

        const products = await PRODUCT.find({isDeleted: false, eID: id}).sort({score: -1});
        console.log(products);
        
        if(products == null) {
            return {
                success: true,
                message: "Doanh nghiệp hiện chưa có sản phẩm nào",
                data: ""
            }
        }

        return {
            success: true,
            message: "Lấy thông tin thành công",
            data: {
                info: enterpriseInfo,
                products: products
            }
        }

    } catch (err) {
		console.log(err);
		return {
            success: false,
            message: 'Oops! Xảy ra lỗi rồi!',
            data: ""
        }
	}
};

exports.getProductOfEnterpriseSortAsync = async (id) => {
    try {
        const enterpriseInfo = userHelper.getEnterpriseInfoAsync(id);

        if(enterpriseInfo == null) {
            return {
                success: false,
                message: "Không lấy được thông tin doanh nghiệp",
                data: ""
            }
        }

        const products = await PRODUCT.find({isDeleted: false, eID: id}).sort({score: -1});
        console.log(products);
        
        if(products == null) {
            return {
                success: true,
                message: "Doanh nghiệp hiện chưa có sản phẩm nào",
                data: ""
            }
        }

        return {
            success: true,
            message: "Lấy thông tin thành công",
            data: {
                info: enterpriseInfo,
                products: products
            }
        }

    } catch (err) {
		console.log(err);
		return {
            success: false,
            message: 'Oops! Xảy ra lỗi rồi!',
            data: ""
        }
	}
};

exports.getSuggestedProductsAsync = async(id) => {
    try {
        const searchHistory = await userHelper.getSearchHistoryAsync(id);
        //console.log(Object.keys(searchHistory)[0]);
        if(searchHistory == null) 
        return {
            success: false,
            message: "Không có dữ liệu lịch sử",
            data: null
        }

        var IDList = [];
        for(var i = 0; i<Object.keys(searchHistory).length; i++) {
            IDList.push(Object.keys(searchHistory)[i])
        }

        const suggestedProducts = await PRODUCT.find({ _id: {$in: IDList} })

        return {
            success: true,
            message: "Danh sách sản phẩm đề xuất",
            data: suggestedProducts
        }
    } catch (err){
        console.log(err);
        return {
            success: false,
            message: 'Oops! Xảy ra lỗi rồi!',
            data: null
        }
    }
}