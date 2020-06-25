const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin, authorizeChange } = require("../controllers/auth")

//Params middleware
router.param("userId", getUserById);

//Protected routes
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", [
    check("name").isLength({ min: 2 }).withMessage("First Name must be atleast 2 characters long")
], isSignedIn, isAuthenticated, authorizeChange, updateUser);

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)

module.exports = router;