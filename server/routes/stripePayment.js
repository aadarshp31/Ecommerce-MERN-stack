const express = require("express");
const router = express.Router();
const { processPayment } = require("../controllers/stripePayment");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
	"/payment/stripe/:userId",
	isSignedIn,
	isAuthenticated,
	processPayment
);

module.exports = router;
