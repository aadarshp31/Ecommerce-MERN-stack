const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paypalPayment");

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)
router.post("/payment/paypal/:userId", isSignedIn, isAuthenticated, processPayment)




module.exports = router;