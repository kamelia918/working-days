const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://kameliaremaki:Ih01VWbb8Eygm13I@payclaim.vlt0vmj.mongodb.net/?retryWrites=true&w=majority&appName=payClaim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
