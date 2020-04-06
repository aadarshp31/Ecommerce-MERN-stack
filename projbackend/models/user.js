const mongoose = require("mongoose")

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
    //TODO come back here!
    password: {
        type: String,
        trim: true
    },
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

module.exports = mongoose.model("User", userSchema);