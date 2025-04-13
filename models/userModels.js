const mongoose = require("mongoose")

const userExtendedModel = require("./userExtendedModels")

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true,"Please provide the user first name"]
    },

    lastName: {
        type: String,
        required: [true,"Please provide the user last name"]
    },

    email: {
        type: String,
        required: [true, "Please provide the email address"],
        unique: [true,"email address already taken"]
    },

    password: {
        type: String,
        required: [true,"please provide the user password"],
    },

    userType: {
        type: String,
        enum: ["user","donor","admin"],
        default: "user",
        required : [true,"user type should not be empty"]
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

const User = mongoose.model("User",userSchema)
module.exports = User