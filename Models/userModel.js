const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    location: {
        country: { type: String },
        state: { type: String }
    },
    relationshipStatus: { type: String },
    about: { type: String },
    friends: { type: [String] }
});

const userModel = new mongoose.model('userModel', userSchema);

module.exports = userModel;

