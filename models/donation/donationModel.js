const mongoose = require("mongoose");

const donationSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true,"name is required"]
    },
    donorId: {
        type: mongoose.Types.ObjectId,
        required: [true,"donor id is required"],
        index: true
    },
    donorType:{
        type: String,
        required: [true,"donor type is required"],
        enum: ["user","business"]
    },
    //based on user type we handle required criteria
    donationLineIds: {
        type: [mongoose.Types.ObjectId],
        ref: "DonationLines"
        //required: [true,"product id is required"]
    },
    totalDonationQuantity: {
        type: Number,
        required: [true,"total donation Quantity is required"],
        min: 0
    },
    donatedQuantity:{
        type: Number,
        default: 0,
        min: 0
    },
    wastedQuantity:{
        type: Number,
        default: 0,
        min: 0
    },
    donationStatus:{
        type: String,
        required: [true,"donation Status is required"],       
        enum: ["Open", "InProgress", "Completed", "Cancelled"],
        default: "Open"

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
    // taxIds:{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Tax"
    // },
    expiryDate:{
        type: Date,
        //required: [true,"expired date is required"]
    },
    orderIds: {
        type: [mongoose.Types.ObjectId],
        ref: "DonationOrder"
    },
    cancelReason:{
        type: String
    }
},
{
    timestamps: true
}
)

const donationModel = mongoose.model("Donation",donationSchema)
module.exports = donationModel