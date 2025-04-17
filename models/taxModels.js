const mongoose = require("mongoose");

const taxSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "tax name is required"],
        unique: [true,"tax name should be unique"]
    },
    description: {
        type: String
    },
    taxRate: {
        type: Number,
        required: [true,"tax rate is required"],
        min: 0,
        max: 100
    },
    cessRate: {
        type: String,
        min: 0,
        max: 100
    },
    childTaxIds: {
        type: [mongoose.Types.ObjectId],
        populate: true,
        ref: "Tax"
    },
    isStandAloneTax: {
        type: Boolean,
        default: true
    },
    isChildTax: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

const taxModel = mongoose.model("Tax",taxSchema)

module.exports = taxModel;