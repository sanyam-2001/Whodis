const express = require('express');
const router = express.Router();
const AuthJWT = require('../Middlewares/AuthJWT')
const userModel = require('../Models/userModel')
router.get('/userDetails', AuthJWT, (req, res) => {
    userModel.findById(req.user.id, (err, obj) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json(obj)
        }
    });
});
router.get('/getUsername/:id', (req, res) => {
    userModel.findById(req.params.id, (err, obj) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ name: `${obj.firstName} ${obj.lastName}` })
        }
    });
});

router.get('/incrementRecieved', AuthJWT, (req, res) => {
    userModel.findByIdAndUpdate(req.user.id, { "$inc": { requestsRecieved: 1 } }, { new: true }, (err) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ code: 200 })
        }
    })
})
router.get('/incrementSent', AuthJWT, (req, res) => {
    userModel.findByIdAndUpdate(req.user.id, { "$inc": { requestsSent: 1 } }, { new: true }, (err) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ code: 200 })
        }
    })
})
router.get('/updateRelationshipStatus/:value', AuthJWT, (req, res) => {
    userModel.findByIdAndUpdate(req.user.id, { relationshipStatus: req.params.value }, { new: true }, (err, newObject) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ code: 200, user: newObject })
        }
    });
});
router.get('/updateGender/:value', AuthJWT, (req, res) => {
    userModel.findByIdAndUpdate(req.user.id, { gender: req.params.value }, { new: true }, (err, newObject) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ code: 200, user: newObject })
        }
    });
});
router.get('/updateAge/:value', AuthJWT, (req, res) => {
    userModel.findByIdAndUpdate(req.user.id, { dateOfBirth: req.params.value }, { new: true }, (err, newObject) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: "Server Error!" });
            return console.error(err);
        }
        else {
            res.json({ code: 200, user: newObject })
        }
    });
});
module.exports = router;