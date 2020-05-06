const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

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
				err: "User Signup failed"
				// err: err.errmsg
			});
		}
		//Response sent to the client after successfully saving the user signup data into the database
		// res.send(user)
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
		});
	});
};

exports.signout = (req, res) => {
	res.clearCookie()
	res.json({
		message: "User Signed out successfully!"
	});
};


exports.signin = (req, res) => {
	//Destructuring email and password from the req.body
	const { email, password } = req.body

	//errors in an object containing the first element as array which contains the info related to the error
	const errors = validationResult(req)

	//Checking for errors thrown by express validator
	if(!errors.isEmpty()){
		return res.status(422).json({
			error: `${errors.array()[0].msg}.\n Parameter: ${errors.array()[0].param}`		
		})
	}

	User.findOne({ email }, (err, user) => {
		if(err){
			return err;
		}
		if(!user){
			return res.status(400).json({
				error: "User Email does not exists"
			})
		}
		if(!user.authenticate(password)){
			return res.status(401).json({
				error: "Email and password do not match"
			})
		}

		//Create authentication token
		const token = jwt.sign({_id: user._id}, process.env.SECRET);
		//Put token in cookie
		res.cookie("token", token, { expire: new Date() + 9999 });

		//send response to the front end
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, name, email, role }});
	})

}

//Protected Routes
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	userProperty: "auth"
})

//Custom middlewares
exports.isAuthenticated = (req, res, next) => {
	const checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if(!checker) {
		return res.status(403).json({
			error: "Access denied: Authentication failed"
		})
	}
	next();
}

exports.isAdmin = (req, res, next) => {
	if(req.profile.role === 0) {
		return res.status(403).json({
			error: "Access denied: You do not have Admin privileges!"
		})
	}
	next();
}