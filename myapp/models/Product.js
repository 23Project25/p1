const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['health-care', 'food', 'toys', 'accessories']
    },
    animalType: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'bird', 'fish', 'rabbit', 'other']
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    specifications: {
        weight: String,
        ingredients: [String],
        dosage: String,
        expiryDate: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
