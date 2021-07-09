const express = require('express');
const router = express.Router();
const AuthJWT = require('../Middlewares/AuthJWT');
const userModel = require('../Models/userModel')

router.get('/removeFriend/:id', AuthJWT, async (req, res) => {
    const user1 = req.params.id, user2 = req.user.id;
    await userModel.findByIdAndUpdate(user1, { "$pull": { "friends": user2 } });
    await userModel.findByIdAndUpdate(user2, { "$pull": { "friends": user1 } });
    res.json({ code: 200 })
});

module.exports = router;