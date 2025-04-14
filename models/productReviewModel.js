reviews: [
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        review: String,
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
]