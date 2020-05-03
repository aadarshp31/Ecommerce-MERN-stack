const express = require("express")
const router = express.Router()
const { signup, signout, signin, isSignedIn } = require("../controllers/auth")
const { check } = require("express-validator")

//Routes

//Signup
router.post("/signup", [
    check("name").isLength({ min: 2 }).withMessage("Name must be atleast 2 characters long"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
], signup)

//Signout
router.get("/signout", signout)

//Signin
router.post("/signin", [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 1 }).withMessage("Password Field is required")
], signin)

//Protected Test Route
router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected route")
    //This is for testing the auth object added to the req object
    // res.json(req.auth)
})

module.exports = router;