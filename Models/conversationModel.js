const mongoose = require('mongoose');


const conversationSchema = mongoose.Schema({
    conversationUID: { type: String },
    user1: { type: String },
    user2: { type: String },
    stringifiedMessages: { type: String }
});

const conversationModel = new mongoose.model('conversationModel', conversationSchema);

module.exports = conversationModel;