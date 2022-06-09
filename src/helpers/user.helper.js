//const { UserImportBuilder } = require('firebase-admin/lib/auth/user-import-builder');
const USER = require('../models/USERINFO.model');

exports.getEnterpriseInfoAsync = async(id) => {
    try {
        const enterprise = await USER.findById(id);
        return enterprise;
    } catch(err) {
        console.log(err);
		return null;
    }
}

exports.getSearchHistoryAsync = async(id) => {
    try {
        const user = await USER.findById(id);
        if(user == null) return null;
        var searchHistory = user.searchHistory;
        if(searchHistory == null) return null;
        
        var counts = {};
        for (var i = 0; i < searchHistory.length; i++) {
            var id = searchHistory[i].pID;
            counts[id] = counts[id] ? counts[id] + 1 : 1;
        }

        return counts;
    } catch(err){
        console.log(err);
        return null;
    }
}