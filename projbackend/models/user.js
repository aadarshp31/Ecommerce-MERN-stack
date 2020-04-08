const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require("uuid/v1")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength = 32,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //Stored Encrypted Password
    encry_password: {
        type: String,
        required: true
    },
    //Salt value used for encryting the Plain Password entered by the user
    salt: String,
    role: {
        type: number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
});

//Dealing with Plain Password provided by the user using vitual fields
userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password
    })

userSchema.method = {

    //Authentication Method for checking the password entered by the user is correct
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },

    //Encrypting the Plain Password proided by the user
    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try{
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest("hex");
        }catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);