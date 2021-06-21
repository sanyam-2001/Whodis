const mongoose = require('mongoose');


const dpSchema = mongoose.Schema({
    userID: { type: String },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const dpModel = new mongoose.model('dpModel', dpSchema);

module.exports = dpModel;

