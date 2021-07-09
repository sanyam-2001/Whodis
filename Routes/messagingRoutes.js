const express = require('express');
const router = express.Router();
const AuthJWT = require('../Middlewares/AuthJWT');
const conversationModel = require('../Models/conversationModel');

router.get('/getConversation/:userID', AuthJWT, async (req, res) => {
    try {
        const conversation1 = await conversationModel.findOne({ user1: req.user.id, user2: req.params.userID });
        const conversation2 = await conversationModel.findOne({ user1: req.params.userID, user2: req.user.id });
        if (!conversation1 && !conversation2) {
            const newConversation = new conversationModel({
                conversationUID: `${req.user.id}${req.params.userID}`,
                user1: req.user.id,
                user2: req.params.userID,
                stringifiedMessages: "[]"
            })
            newConversation.save();
            res.json({ code: 200, conversation: newConversation })
        }
        else {
            const conversation = conversation1 || conversation2;
            res.json({ code: 200, conversation })
        }
    }
    catch (err) {
        res.json({ code: 500, message: 'Internal Server Error!' })
    }
})



module.exports = router;