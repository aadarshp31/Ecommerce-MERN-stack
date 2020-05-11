const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order")

//Params
router.param("userId", getUserById)
router.param("orderId", getOrderById)


//Actual routes

//Create order route
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

//Get / Read order route
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//Get order status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

//Update order route
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router;