const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster', 'guinea-pig', 'other']
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
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
    image: {
        type: String,
        required: true
    },
    healthStatus: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'needs-care'],
        default: 'good'
    },
    vaccinationStatus: {
        type: String,
        enum: ['fully-vaccinated', 'partially-vaccinated', 'not-vaccinated'],
        default: 'fully-vaccinated'
    },
    availability: {
        type: String,
        enum: ['available', 'reserved', 'sold'],
        default: 'available'
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Animal', animalSchema);
