const express = require('express');
const router = express.Router();
const dpModel = require('../Models/dpModel');
const AuthJWT = require('../Middlewares/AuthJWT')
const upload = require('../Middlewares/multerInit');
const fs = require('fs')
const path = require('path')
router.post('/dp', AuthJWT, upload.single('dp'), (req, res) => {
    const newdp = {
        userID: req.user.id,
        img: {
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    };
    dpModel.findOneAndUpdate({ userID: req.user.id }, newdp, { upsert: true, new: true }, (err, dp) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else {
            let src = `data:${dp.img.contentType};base64,${dp.img.data.toString('base64')}`;
            res.json({ src })
        }
    })
});
router.get('/dp', AuthJWT, (req, res) => {
    dpModel.findOne({ userID: req.user.id }, (err, dp) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        if (!dp) { res.json({ src: null }) }
        else {
            let src = `data:${dp.img.contentType};base64,${dp.img.data.toString('base64')}`;
            res.json({ src })
        }
    })
});

router.get('/getDp/:id', (req, res) => {
    dpModel.findOne({ userID: req.params.id }, (err, dp) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        if (!dp) { res.json({ src: null }) }
        else {
            let src = `data:${dp.img.contentType};base64,${dp.img.data.toString('base64')}`;
            res.json({ src })
        }
    })
});

module.exports = router
