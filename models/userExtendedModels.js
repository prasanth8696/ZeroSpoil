const mongoose = require("mongoose");

const userExtendedSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },

        userType: {
            type: String,
            enum: ["user", "business"],
            required: [true, "user type should not be empty"]
        },

        phone: {
            type: String,
        },

        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,  
            country: String,
            coordinates: String
        }
    },
    {
        timestamps: true,
    }
);

const userExtendedModel = mongoose.model('UserExtended', userExtendedSchema);  
module.exports = userExtendedModel;
