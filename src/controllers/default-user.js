const { use } = require('react');
const userSchema = require('../services/user/user.schema');
const crypto = require("../utils/crypto");

module.exports.createDefaultUser = async () => {
    try {
        const existing_user = await userSchema.findOne({});
        if(existing_user) return;
       
        const email = process.env.DEFAULT_USER_EMAIL || '';
        const password = process.env.DEFAULT_USER_PASSWORD || '';
       

        
    } catch (error) {
        console.log('Error creating default user:', error);
        
    }
}