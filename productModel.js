const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String, default: ""},
    quantity: {type: Number, default: 0},
    inStock: {type: Boolean, default: false},

}, { timestamps: true } )

const Product = new mongoose.model("Product", productSchema)

module.exports = Product