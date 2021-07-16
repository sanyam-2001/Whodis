const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
    userID: { type: String },
    comment: { type: String },
    timestamp: { type: String }

})

const postSchema = mongoose.Schema({
    userID: { type: String },
    img:
    {
        data: Buffer,
        contentType: String
    },
    caption: { type: String },
    timestamp: { type: String },
    comments: { type: [commentModel] },
    likes: { type: [String] }
});

const postModel = new mongoose.model('postModel', postSchema);
module.exports = postModel;