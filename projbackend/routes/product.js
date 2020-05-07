const express = require("express")
const router = express.Router()

const { createProduct, getProductById, getProduct, getPhoto } = require("../controllers/product")
const { getUserById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")


//Routes for params
router.param("userId", getUserById)
router.param("productId", getProductById)

//Actual Routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", getPhoto)


module.exports = router;