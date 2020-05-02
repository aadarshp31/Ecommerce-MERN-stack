const User = require("../models/user")
const { validationResult } = require("express-validator")

exports.signup = (req, res) => {
	//errors in an object containing the first element as array which contains the info related to the error
	const errors = validationResult(req)

	//Checking for errors thrown by express validator
	if(!errors.isEmpty()){
		return res.status(422).json({
			error: `${errors.array()[0].msg}.\n Parameter: ${errors.array()[0].param}`		
		})
	}

	//Creating new user for each signup request
	const user = new User(req.body)
	user.save((err, user) => {
		//Checking for errors before saving to the database
		if (err) {
			return res.status(400).json({
				err: "User was not stored in the database!"
			});
		}
		//Response sent to the client after successfully saving the user signup data into the database
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
		});
	});
};

exports.signout = (req, res) => {
	res.json({
		message: "User Sign out page"
	});
};
