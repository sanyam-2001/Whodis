// require('dotenv).config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io')
const signupRoute = require('./Routes/signupRoute');
const loginRoute = require('./Routes/loginRoute');
const userRoute = require('./Routes/userRoutes');
const coverRoute = require('./Routes/coverRoutes');
const dpRoute = require('./Routes/dpRoute');

// SOCKET IMPORTS
const findNewChatRoulette = require('./Socket/CRSocket/findNewChatRoulette')

mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to Whodis DB!")
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('client/build'))

io.on('connection', (socket) => {
    console.log(`${socket.id} has Joined`)
    socket.on('findNewChatRoulette', ({ JWTTOKEN }) => {
        findNewChatRoulette(socket, JWTTOKEN, io);
    });
    socket.on('sendMessage', ({ roomID, message }) => {
        const date = new Date(Date.now());
        socket.to(roomID).emit('messageRecieved', {
            time: `${date.getHours()}:${date.getMinutes()}`,
            message
        });
    });

    socket.on('disconnect', () => console.log(`${socket.id} has Left!`))
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



server.listen(process.env.PORT || 5000);
