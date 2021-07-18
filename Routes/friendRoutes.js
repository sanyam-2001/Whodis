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
router.get('/checkFriendStatus/:id', AuthJWT, async (req, res) => {
    const checkerID = req.user.id;
    const friend = req.params.id;
    //Check if They Are Friends
    const user = await userModel.findById(checkerID);
    if (user.friends.indexOf(friend) !== -1) {
        return res.json({ code: 1, message: 'Friend' })
    }
    if (user.searchRequestsSent.indexOf(friend) !== -1) {
        return res.json({ code: 2, message: 'requestAlreadySent' })
    }
    res.json({ code: 3, message: 'notFriend' })

});

router.get('/sendRequest/:id', AuthJWT, async (req, res) => {
    try {
        const sender = req.user.id;
        const receiver = req.params.id;

        await userModel.findByIdAndUpdate(sender, { "$push": { searchRequestsSent: receiver } });
        await userModel.findByIdAndUpdate(receiver, { "$push": { searchRequestsRecieved: sender } });

        res.json({ code: 200 })
    }
    catch (err) {
        res.json({ code: 500 })
    }
});
router.get('/acceptRequest/:id', AuthJWT, async (req, res) => {
    try {
        const acceptor = req.user.id;
        const acceptee = req.params.id;

        await userModel.findByIdAndUpdate(acceptor, { "$pull": { searchRequestsReceived: acceptee } });
        await userModel.findByIdAndUpdate(acceptee, { "$pull": { searchRequestsSent: acceptor } });
        await userModel.findByIdAndUpdate(acceptor, { "$push": { friends: acceptee } });
        await userModel.findByIdAndUpdate(acceptee, { "$push": { friends: acceptor } });

        res.json({ code: 200 })
    }
    catch (err) {
        res.json({ code: 500 })
    }
})

module.exports = router;