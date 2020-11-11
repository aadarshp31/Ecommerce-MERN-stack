const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 32,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 2000,
			required: true,
		},
		price: {
			type: Number,
			trim: true,
			maxlength: 32,
			required: true,
		},
		category: {
			type: ObjectId,
			ref: "Category",
			required: true,
		},
		stock: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		photo: {
			data: String,
			contentType: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
