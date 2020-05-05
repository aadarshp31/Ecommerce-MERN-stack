const User = require("../models/user")

exports.getUserById = (req, res, next , id) => {
    User.findById(id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Error occured while finding user!"
            })
        }
        if(!user){
            return res.status(404).json({
                error: "User not found in DB!"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    //TODO: come back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            if(!user){
                return res.status(400).json({
                    error: "Bad Request: User not found in DB!"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
        )
}