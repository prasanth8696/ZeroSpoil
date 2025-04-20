const mongoose = require('mongoose');
const taxModel = require("./taxModels")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: ["Fruits", "Vegetables", "Dairy", "Bakery", "Meat", "Seafood", "Beverages", "Snacks", "Frozen"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0
        },
        stock: {
            type: Number,
            required: [true, "Product stock is required"],
            min: 0
        },
        description: {
            type: String,
            trim: true
        },
        expiryDate: {
            type: Date,
            required: [true,"product expiryDate is required"]
        },
        unit: {
            type: String,
            required: [true, "Product unit is required"],
            enum: ["kg", "g", "l", "ml"]
        },
        imageUrl: {
            type: String,
            trim: true
        },
        defaultTaxes: {
            type: [mongoose.Types.ObjectId],
            ref: taxModel,
            populate: true

        },
        ratings: {
            type: Number,
            min: 0,
            max: 5
        },
        productType: {
            type: String,
            required: [true, "Product type is required"],
            enum: ["grocery","restaurant"],
        },
        ownerId : {
            type: mongoose.Types.ObjectId,
            ref: "Business",
            required: [true,"please provide the owner of the product"]
        },

        totalSale: {
            type: Number,
            min: 0
        }
        
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
