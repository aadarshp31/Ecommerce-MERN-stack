const {Order, ProductCart} = require("../models/order")

//Getting order by orderId and adding it to req.order object
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err || !order){
            return res.status(400).json({
                error: "Bad request: Error occured while getting order by Id from DB"
            })
        }
        req.order = order;
        next();
    })
}

//Create order
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if(err || !order){
            return res.status(400).json({
                error: "Bad request: Error occurred while saving the order in DB"
            })
        }
        res.json(order)
    })
}

//Get all orders
exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
        if(err || !orders){
            return res.status(400).json({
                error: "Bad request: Error while getting all the orders from DB"
            })
        }
        res.json(orders)
    })
}

//Get order status
exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)

}

//Update order status
exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId}, 
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err || !order){
                return res.status(400).json({
                    error: "Bad request: Error occured while updating the order status"
                })
            }
            res.json(order)
        }
        )
}