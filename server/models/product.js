const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			maxlength: 128,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 2000,
			required: true,
		},
		brand: {
			type: String
		},
		warrantyInformation: {
			type: String,
			default: "1 month warranty"
		},
		shippingInformation: {
			type: String,
			default: "Ships in 1 month"
		},
		availabilityStatus: {
			type: String,
			default: "Low Stock"
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
		discountPercentage: {
			type: Number,
			default: 0,
			required: true
		},
		rating: {
			type: Number
		},
		tag: {
			type: Array,
			default: []
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
		reviews: {
			type: Array,
			default: []
		},
		returnPolicy: {
			type: String, 
			default: "30 days return policy"
		},
		minimumOrderQuantity: {
			type: Number,
			default: 1
		},
		thumbnail: {
			type: String,
			required: true
		},
		images: {
			type: Array,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
