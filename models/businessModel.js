const mongoose = require("mongoose")

const userExtendedModel = require("./userExtendedModel")

const businessSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true,"Please provide the business shop  name"]
    },
    email: {
        type: String,
        required: [true, "Please provide the email address"],
        unique: [true,"email address already taken"]
    },
    password: {
        type: String,
        required: [true,"please provide the password"],
    },
    businessType: {
        type: String,
        enum: ["restaurant","grocery"],
        required : [true,"buisness type should not be empty"]
    },
    isBusinessUser: {
        type: Boolean,
        default: true
    },
    accountType:{
        type: String,
        default: "business"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpire: {
        type: Date
    },
    totalFoodWasted: {
        type: Number,
        min: 0,
        default: 0
    },
    totalFoodSaved: {
        type: Number,
        min: 0,
        default: 0
    },
    totalFoodWastedInWeek: {
        type: Number,
        min: 0,
        default: 0
    },
    totalFoodSavedInWeek: {
        type: Number,
        min: 0,
        default: 0
    },
    usersExtendedId: {
        type: mongoose.Types.ObjectId,
        populate: true,
        ref: userExtendedModel
    }
  
},

{
    timestamps: true
}

)

const businessModel = mongoose.model("Business",businessSchema)
module.exports = businessModel