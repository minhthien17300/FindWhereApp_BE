const TYPE = require('../models/TYPE.model');

exports.getALLTypeAsync = async () => {
    try {
        const type = await TYPE.find();
        return type;
    } catch (err) {
		console.log(err);
		return null;
	}
}

exports.addTypeAsync = async (body) => {
    try {
        const { typeName } = body;
        const type = await TYPE.find({typeName: typeName});
        if(type==null) {
            return {
                message: 'Loại đã tồn tại!',
                success: false
            }
        }
        const newType = new TYPE({
            typeName: typeName
        });
        await newType.save();
        return {
            message: 'Thêm loại thành công!',
            success: true,
            data: newType
        }
    } catch (err) {
		console.log(err);
		return {
            message: 'Oops! Gặp lỗi rồi!',
            success: false
        };
	}
}