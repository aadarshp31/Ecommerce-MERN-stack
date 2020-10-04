const express = require("express");
const router = express.Router();
const {
	getCategoryById,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
	removeCategory,
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Param middleware
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Create category route
router.post(
	"/category/create/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory
);

//Get category routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update category routes
router.put(
	"/category/:categoryId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory
);

//Delete category routes
router.delete(
	"/category/:categoryId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeCategory
);

//exporting all routes to express.Router()
module.exports = router;
