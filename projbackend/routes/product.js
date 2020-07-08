const express = require("express");
const router = express.Router();

const {
	createProduct,
	getProductById,
	getProduct,
	getAllProduct,
	getPhoto,
	deleteProduct,
	updateProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//Routes for params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Actual Routes
//Create route
router.post(
	"/product/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);

//Read routes
router.get("/products", getAllProduct);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);

//Delete route
router.delete(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct
);

//Update route
router.put(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct
);

//Listing route

module.exports = router;
