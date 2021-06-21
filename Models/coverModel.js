const mongoose = require('mongoose');


const coverSchema = mongoose.Schema({
    userID: { type: String },
    isCenter: { type: Boolean },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const coverModel = new mongoose.model('coverModel', coverSchema);

module.exports = coverModel;

