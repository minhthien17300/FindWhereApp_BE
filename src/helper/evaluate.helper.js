const EVALUATE = require('../models/EVALUATE.model');
const PRODUCT = require('../models/PRODUCT.model');
const USER = require('../models/USERINFO.model');
const {DontSayTheseWords} = require('../config/config');
const {defaultGameStatus} = require('../config/defineModel');

exports.checkComment = (comment) => {
    var cmt = new String(comment).toLowerCase();
    for (var word of DontSayTheseWords) {
        if (cmt.indexOf(word) != -1) return false;
    }
    return true;
}

exports.scoreCalculatorAsync = async (pID) => {
    try {
        var score = 0;
        var avgScore = 0;
        const evaluates = await EVALUATE.find({ pID: pID });
        if (evaluates.length > 0) {
            for (var evaluate of evaluates) {
                score = score + evaluate.score;
            }
            avgScore = score/evaluates.length;
        }
        await PRODUCT.findOneAndUpdate(
                { _id: pID },
                { score: avgScore },
                { new: true }
            );
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}

exports.autoBanUserAsync = async (uID) => {
    try {
        const user = await USER.findById({ _id: uID });
        if (user.isWarned < 3) {
            user.isWarned = user.isWarned + 1;
            await user.save();
            return false;
        } else {
            user.isActived = false;
            await user.save();
            return true;
        }
    } catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}