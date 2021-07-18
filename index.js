//require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io')
const signupRoute = require('./Routes/signupRoute');
const loginRoute = require('./Routes/loginRoute');
const userRoute = require('./Routes/userRoutes');
const coverRoute = require('./Routes/coverRoutes');
const friendRoute = require('./Routes/friendRoutes')
const dpRoute = require('./Routes/dpRoute');
const postRoutes = require('./Routes/postRoutes')
const path = require('path');
const messagingRoutes = require('./Routes/messagingRoutes')
// SOCKET IMPORTS
const findNewChatRoulette = require('./Socket/CRSocket/findNewChatRoulette');
const destroyRoom = require('./Socket/CRSocket/destroyRoom');
const acceptRequest = require('./Socket/CRSocket/acceptRequest');
const handleLeave = require('./Socket/CRSocket/handleLeave');
const sendMessage = require('./Socket/MSocket/sendMessage')

mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
    console.log("Connected to Whodis DB!")
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
    console.log(`${socket.id} has Joined`);
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
    socket.on('sendRequest', (roomID) => {
        socket.to(roomID).emit('friendRequestRecieved');
    });
    socket.on('requestDeclined', (roomID) => {
        io.in(roomID).emit('requestDeclined');
    });
    socket.on('requestAccepted', (roomID) => {
        acceptRequest(io, roomID);
    });
    socket.on('destroyRoom', async (roomID) => {
        destroyRoom(io, roomID);
    });
    socket.on('disconnect', () => {
        console.log(`${socket.id} has Left!`)
        handleLeave(socket, io);
    });


    socket.on('joinConversation', ({ roomID, name }) => {
        socket.join(roomID);
        console.log(`${name} Joined ${roomID} Conversation!`)
        socket.on('chatMessageSent', ({ messagePayload, thisRoom }) => {
            sendMessage(socket, thisRoom, messagePayload);
        })
    })

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
app.use('/', friendRoute);
app.use('/', messagingRoutes);
app.use('/', postRoutes);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


server.listen(process.env.PORT || 5000);
