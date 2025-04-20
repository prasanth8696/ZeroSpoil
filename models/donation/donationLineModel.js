const mongoose = require("mongoose");

//visible properties productId,quantity,taxIds,discount,originalAmt,finalAmt
const donationLineSchema = mongoose.Schema({

    productId: {
        type: mongoose.Types.ObjectId,
        required: [true,"product id is required"],
        ref: "Product"
    },
    totalQuantity:{
        type: Number,
        required: [true,"product Quantity is required"]
    },
    completedQuantity:{
        type: Number,
        default: 0,
        min: 0
    },
    taxIds:{
        type: [mongoose.Types.ObjectId],
        ref: "Tax"
    },
    discount:{
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }, 
    originalAmt: {
        type: Number,
        default: 0,
        min: 0
    },
    discountAmt:{
        type: Number,
        default: 0,
        min: 0
    },
    totalTaxAmt: {
        type: Number,
        default: 0,
        min: 0
    },
    finalAmt:{
        type: Number,
        default: 0,
        min: 0
    },
    isFree: {
        type: Boolean,
        default: false
    },
    orderIds:{
        type: [mongoose.Types.ObjectId],
        ref: "DonationOrder"
    },
    donationId: {
        type: mongoose.Types.ObjectId,
        ref: "Donation"
    },
    expiryDate:{
        type: Date,
        required: [true,"expiry date is required"]
    },
    isExpired: {
        type: Boolean,
        default: false
    }
})

const donationLineModel = mongoose.model("DonationLines",donationLineSchema);
module.exports = donationLineModel;