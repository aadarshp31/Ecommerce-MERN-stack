const Category = require("../models/category");

//Create category
exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while saving category to DB",
			});
		}
		res.json(category);
	});
};

//Middleware | Get category by ID and store them in req.category object
exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while finding category",
			});
		}
		if (!category) {
			return res.status(404).json({
				error: "Not found: Category not found",
			});
		}
		req.category = category;
		next();
	});
};

//Get one category
exports.getCategory = (req, res) => {
	res.json(req.category);
};

//Get all categories
exports.getAllCategory = (req, res) => {
	Category.find().exec((err, allCategories) => {
		if (err) {
			return res.status(400).json({
				error:
					"Bad request: Error occured while getting all categories from DB",
			});
		}
		if (!allCategories) {
			return res.status(404).json({
				error: "Not found: No categories were found on the DB",
			});
		}
		res.json(allCategories);
	});
};

exports.updateCategory = (req, res) => {
	const category = req.category;
	category.name = req.body.name;
	category.save((err, updatedCategory) => {
		if (err || !updatedCategory) {
			return res.status(400).json({
				error: "Bad request: Error occured while updating category in DB",
			});
		}
		res.json(updatedCategory);
	});
};

exports.removeCategory = (req, res) => {
	const category = req.category;
	category.remove((err, removedCategory) => {
		if (err) {
			return res.status(400).json({
				error: "Bad request: Error occured while deleting category in DB",
			});
		}
		res.json({
			message: ` \'${removedCategory.name}\' category was deleted successfully from the DB`,
		});
	});
};
