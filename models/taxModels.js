const mongoose = require("mongoose");

const taxSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "tax name is required"]
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
    cessAmt: {
        type: String,
        min: 0,
        max: 100
    },
    childTaxes: {
        type: [mongoose.Types.ObjectId],
        populate: true,
        ref: "Tax"
    },
    standAloneTax: {
        type: Boolean,
        deafult: true
    } 

})

const taxModel = mongoose.model("Tax",taxSchema)

module.exports = taxModel;