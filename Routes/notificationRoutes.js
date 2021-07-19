const express = require('express');
const router = express.Router();
const AuthJWT = require('../Middlewares/AuthJWT');
const dpModel = require('../Models/dpModel')
const coverModel = require('../Models/coverModel')
const userModel = require('../Models/userModel')
router.get('/notificationInfo', AuthJWT, async (req, res) => {
    const { searchRequestsRecieved } = await userModel.findById(req.user.id)
    res.json({ code: 200, list: searchRequestsRecieved })
});
router.get('/acceptNotification/:id', AuthJWT, async (req, res) => {
    const acceptor = req.user.id;
    const acceptee = req.params.id;
    const { searchRequestsRecieved } = await userModel.findByIdAndUpdate(acceptor, { "$pull": { searchRequestsRecieved: acceptee } }, { new: true });
    await userModel.findByIdAndUpdate(acceptee, { "$pull": { searchRequestsSent: acceptor } });
    await userModel.findByIdAndUpdate(acceptor, { "$push": { friends: acceptee } });
    await userModel.findByIdAndUpdate(acceptee, { "$push": { friends: acceptor } });

    res.json(searchRequestsRecieved);

})
module.exports = router;