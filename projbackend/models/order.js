const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["Recieved", "Processing", "Shipped", "Cancelled","Delivered"],
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
},
{timestamps: true}
);

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = {Order, ProductCart};