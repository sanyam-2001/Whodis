const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    user1: { type: String },
    user1ID: { type: String },
    user2: { type: String },
    user2ID: { type: String },
    roomID: { type: String },
    status: { type: Boolean }
});

const roomModel = new mongoose.model('roomModel', roomSchema);

module.exports = roomModel;