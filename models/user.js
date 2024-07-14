//models/user.js
const mongoose = require('mongoose')


const workdaySchema = new mongoose.Schema({
    TypeOfTest: { 
        type: String, 
        required: true 
    },
    date: {
         type: Date, 
         required: true 
        },
    startTime: { 
        type: String, 
        required: true 
    },
    endTime: { 
        type: String, 
        required: true 
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 255
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        // min: 10,
        // max: 10
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
    workdays: [workdaySchema],
})

const User = mongoose.model('User', userSchema);

module.exports = User;