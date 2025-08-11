const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const multer = require('multer');
const path = require('path');

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all animals
router.get('/', async (req, res) => {
    try {
        const { species, breed, age, gender, location } = req.query;
        let query = {};

        if (species) query.species = species;
        if (breed) query.breed = { $regex: breed, $options: 'i' };
        if (age) query.age = { $lte: parseInt(age) };
        if (gender) query.gender = gender;
        if (location) query.location = { $regex: location, $options: 'i' };
        if (req.query.availability) query.availability = req.query.availability;

        const animals = await Animal.find(query).sort({ createdAt: -1 });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get available animals
router.get('/available', async (req, res) => {
    try {
        const animals = await Animal.find({ availability: 'available' }).sort({ createdAt: -1 });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single animal
router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new animal
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const animalData = {
            ...req.body,
            image: req.file ? req.file.filename : 'default-animal.jpg'
        };

        const animal = new Animal(animalData);
        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update animal
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const animal = await Animal.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json(animal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update animal availability
router.patch('/:id/availability', async (req, res) => {
    try {
        const { availability } = req.body;
        const animal = await Animal.findByIdAndUpdate(
            req.params.id,
            { availability },
            { new: true }
        );
        
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        
        res.json(animal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete animal
router.delete('/:id', async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
