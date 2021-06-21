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

module.exports = router;