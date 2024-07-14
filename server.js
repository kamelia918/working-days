const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://kameliaremaki:Ih01VWbb8Eygm13I@payclaim.vlt0vmj.mongodb.net/?retryWrites=true&w=majority&appName=payClaim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
