const User = require("../models/user")
const Order = require("../models/order")

//Middleware for getting the user by id
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
            return res.json(user);
        }
        )
}

exports.updateUserPassword = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: {password: req.body.newPassword}},
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
            return res.json(user);
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id}).populate("user", "_id name").exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Bad request: error occurred while getting orders"
            })
        }
        if(!order){
            return res.status(404).json({
                error: "Not found: No orders found in the purchase list/cart"
            })
        }
        return res.json(order);
    })
}

//Middleware for pushing the orders in the purchase list
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        const { _id, name, description, category,  quantity } = product;
        const amount = req.body.order.amount;
        const transaction_id = req.body.order.transaction_id;

        //Pushing the product information in purchases array
        purchases.push({_id, name, description, category, quantity, amount, transaction_id});
    })
    //Store purchases array into the DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Bad request: Error occured while updating purchase list"
                })
            }
            next();
        }
    )
}