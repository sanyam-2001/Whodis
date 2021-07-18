const express = require('express');
const router = express.Router();
const uploads = require('../Middlewares/multerInit');
const AuthJWT = require('../Middlewares/AuthJWT');
const coverModel = require('../Models/coverModel');
const fs = require('fs');
const path = require('path');

router.post('/coverImage', AuthJWT, uploads.single('coverImage'), (req, res) => {
    const newcoverImage = {
        userID: req.user.id,
        isCenter: true,
        img: {
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    };
    coverModel.findOneAndUpdate({ userID: req.user.id }, newcoverImage, { upsert: true, new: true }, (err, coverImage) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else {
            let src = `data:${coverImage.img.contentType};base64,${coverImage.img.data.toString('base64')}`;
            res.json({ src, isCenter: true })
        }
    });
});


router.get('/coverImage', AuthJWT, (req, res) => {
    coverModel.findOne({ userID: req.user.id }, (err, coverImage) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        if (!coverImage) { res.json({ src: null }) }
        else {
            let src = `data:${coverImage.img.contentType};base64,${coverImage.img.data.toString('base64')}`;
            res.json({ src, isCenter: coverImage.isCenter })
        }
    })
});
router.get('/coverImage/:id', (req, res) => {
    coverModel.findOne({ userID: req.params.id }, (err, coverImage) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        if (!coverImage) { res.json({ src: null }) }
        else {
            let src = `data:${coverImage.img.contentType};base64,${coverImage.img.data.toString('base64')}`;
            res.json({ src, isCenter: coverImage.isCenter })
        }
    })
})
router.get('/changeCoverPosition', AuthJWT, (req, res) => {
    coverModel.findOne({ userID: req.user.id }, (err, coverImage) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        if (!coverImage) { res.json({ success: false }) }
        else {
            coverImage.isCenter = !coverImage.isCenter
            coverImage.save((err, result) => {
                if (err) {
                    res.json({ code: 500, errCode: 500, message: 'Server Error!' });
                    return console.error(err);
                }
                else {
                    res.json({ success: true })
                }
            })
        }

    })
})
module.exports = router;