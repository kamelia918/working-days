// const jwt = require('jsonwebtoken');

// function auth(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).send('Access denied. No token provided.');

//     try {
//         const decoded = jwt.verify(token, 'key123');
//         req.user = decoded;
//         next();
//     } catch (ex) {
//         res.status(400).send('Invalid token.');
//     }
// }

// module.exports = auth;


// Middleware for token verification (auth.js)
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, 'key123');
        req.user = await User.findById(verified._id);
        if (!req.user) {
            return res.status(401).send('Invalid Token');
        }
        next();
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
};

module.exports = auth;

