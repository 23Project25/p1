const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get cart for user
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId })
            .populate('items.product');
        
        if (!cart) {
            return res.json({ items: [], totalAmount: 0 });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        
        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price
            });
        }
        
        cart.totalAmount = cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
        
        cart.updatedAt = Date.now();
        await cart.save();
        
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart item quantity
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const item = cart.items.find(item => 
            item.product.toString() === productId
        );
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        if (quantity <= 0) {
            cart.items = cart.items.filter(item => 
                item.product.toString() !== productId
            );
        } else {
            item.quantity = quantity;
        }
        
        cart.totalAmount = cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
        
        cart.updatedAt = Date.now();
        await cart.save();
        
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/remove', verifyToken, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );
        
        cart.totalAmount = cart.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
        
        cart.updatedAt = Date.now();
        await cart.save();
        
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get cart total
router.get('/total/:userId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.json({ totalAmount: 0 });
        }
        
        res.json({ totalAmount: cart.totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get cart items count
router.get('/count/:userId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        if (!cart) {
            return res.json({ count: 0 });
        }
        
        res.json({ count: cart.items.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
