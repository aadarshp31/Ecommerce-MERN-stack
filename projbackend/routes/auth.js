const express = require("express")
const router = express.Router()
const { signup, signout } = require("../controllers/auth")
const { check } = require("express-validator")

//Routes
router.post("/signup", [
    check("name").isLength({ min: 2 }).withMessage("Name must be atleast 2 characters long"),
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
], signup)
router.get("/signout", signout)

module.exports = router;