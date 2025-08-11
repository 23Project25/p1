const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
router.post('/', async (req, res) => {
    try {
        const { userId, items, shippingAddress } = req.body;

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.productId} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }

            orderItems.push({
                product: item.productId,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;

            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            user: userId,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product', 'name image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product', 'name image');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
