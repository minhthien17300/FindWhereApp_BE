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

exports.distanceBetweenEnterpriseAndShipper = async (lat1, lng1, lat2, lng2) => {
    try {
        var R = 6371;
        var dLat = Math.abs(lat2 - lat1) * (Math.PI / 180);
        var dLon = (lng2 - lng1) * (Math.PI / 180);
        var la1ToRad = lat1 * (Math.PI / 180);
        var la2ToRad = lat2 * (Math.PI / 180);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad)
                * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
    return d;//as km
    } catch (err) {
        return 1000000;
    }
}