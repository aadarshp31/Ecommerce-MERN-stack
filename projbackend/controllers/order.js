const { Order } = require("../models/order");

//Getting order by orderId and adding it to req.order object
exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err || !order) {
				return res.status(400).json({
					error: "Bad request: Error occured while getting order by Id from DB",
				});
			}
			req.order = order;
			next();
		});
};

//Create order
exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err || !order) {
			return res.status(400).json({
				error: "Bad request: Error occurred while saving the order in DB",
			});
		}
		res.json(order);
	});
};

//Get all orders
exports.getAllOrders = (req, res) => {
	//ternary operator used here to check for user input for "limit" which will be treated as string by default
	//Parsing the string value (limit) to integer number is done by parseInt(string)
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let skip = req.query.skip ? parseInt(req.query.skip) : 0;

	//check for user input for "sortBy" & "ascDesc" which will be treated as string by default
	let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
	let ascDesc = req.query.ascDesc ? req.query.ascDesc : "desc";

	Order.find()
		.populate("user", "_id name")
		.sort({ [sortBy]: ascDesc })
		.skip(skip)
		.limit(limit)
		.exec((err, orders) => {
			if (err || !orders) {
				return res.status(400).json({
					error: "Bad request: Error while getting all the orders from DB",
				});
			}
			res.json(orders);
		});
};

exports.getOrdersForUser = (req, res) => {
	//ternary operator used here to check for user input for "limit" which will be treated as string by default
	//Parsing the string value (limit) to integer number is done by parseInt(string)
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let skip = req.query.skip ? parseInt(req.query.skip) : 0;

	//check for user input for "sortBy" & "ascDesc" which will be treated as string by default
	let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
	let ascDesc = req.query.ascDesc ? req.query.ascDesc : "desc";

	Order.find({ user: req.profile._id })
		.populate("user", "_id name")
		.sort({ [sortBy]: ascDesc })
		.skip(skip)
		.limit(limit)
		.exec((err, orders) => {
			if (err) {
				res.status(400).json({
					error: err,
					message: "Error Occured while finding orders for user!",
				});
			}
			if (!orders) {
				res.status(404).json({
					message: "No orders found for this user!",
				});
			}
			res.json(orders);
		});
};

//Get order status
exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValues);
};

//Update order status
exports.updateStatus = (req, res) => {
	Order.update(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err || !order) {
				return res.status(400).json({
					error: "Bad request: Error occured while updating the order status",
				});
			}
			res.json(order);
		}
	);
};
