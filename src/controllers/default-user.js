
const userSchema = require('../services/user/user.schema');
const crypto = require("../utils/crypto");

module.exports.createDefaultUser = async () => {
    try {
        const existing_user = await userSchema.findOne({});
        if(existing_user) return;
       
        const email = process.env.DEFAULT_USER_EMAIL || '';
        const password = process.env.DEFAULT_USER_PASSWORD || '';
        if(!email || !password) return console.log('Default user email or password not set in environment variables. Failed to create default user.');
        await userSchema.create({ email, password: crypto.encrypt(password) });
        console.log('=> ✅ Default user created successfully');
         
            
       

        
    } catch (error) {
        console.log('=> ❌ Error creating default user:', error);
        
    }
}