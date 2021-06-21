require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const signupRoute = require('./Routes/signupRoute');
const loginRoute = require('./Routes/loginRoute');
const userRoute = require('./Routes/userRoutes')
const coverRoute = require('./Routes/coverRoutes')
const dpRoute = require('./Routes/dpRoute')
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to Whodis DB!")
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});
app.get('/test', (req, res) => {
    res.json({ statusCode: 200 });
})
app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/', userRoute);
app.use('/', coverRoute);
app.use('/', dpRoute);

app.listen(process.env.PORT || 5000);