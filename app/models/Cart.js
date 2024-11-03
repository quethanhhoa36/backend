const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    items: [
        {
            // type: mongoose.Schema.Types.Mixed,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
            },
            quantity: {
                type: Number,
            },
        }
    ],
    duedate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 10,
    },
    finished: {
        type: Boolean,
        required: true,
        default: false,
    }
})

module.exports = mongoose.model("Cart", cartSchema)