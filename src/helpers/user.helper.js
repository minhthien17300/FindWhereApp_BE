const { UserImportBuilder } = require('firebase-admin/lib/auth/user-import-builder');
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