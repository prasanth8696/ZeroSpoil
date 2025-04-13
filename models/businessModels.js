const mongoose = require("mongoose")

const userExtendedModel = require("./userExtendedModels")

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