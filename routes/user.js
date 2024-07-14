const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate user input
    const user = new User({ name, email, phone, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, 'key123', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).send('Logged in successfully');
});

// Logout Route
router.post('/logout', auth, (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
});

// Get User Info Route
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Route to get all workdays for the logged-in user
router.get('/workdays', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.workdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour enregistrer les heures de travail
router.post('/workdays', auth, async (req, res) => {
    const { TypeOfTest,date, startTime, endTime } = req.body;
    const user = await User.findById(req.user._id);

    user.workdays.push({ TypeOfTest,date, startTime, endTime });

    try {
        await user.save();
        res.status(201).send('Workday recorded successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const generateWorkdaysExcel = require('../utils/generateExcel');
const path = require('path');
const fs = require('fs');

router.get('/download', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const filePath = path.join(__dirname, '..', 'files', `${user._id}_workdays.xlsx`);

    generateWorkdaysExcel(user.workdays, filePath);

    res.download(filePath, `${user.name}_workdays.xlsx`, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error downloading the file');
        } else {
            fs.unlinkSync(filePath); // Optionally delete the file after sending
        }
    });
});


module.exports = router;
