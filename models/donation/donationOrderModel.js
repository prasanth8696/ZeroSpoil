const mongoose = require("mongoose")

const donationOrderSchema = mongoose.Schema({

    productId: {
        type: mongoose.Types.ObjectId,
        required: [true,"productId is required"]
    },
    
})

const donationOrderModel = mongoose.model("DonationOrder",donationOrderSchema)
module.exports = donationOrderModel