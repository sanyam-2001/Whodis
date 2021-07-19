const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const postModel = require('../Models/postModel');
const uploads = require('../Middlewares/multerInit');
const AuthJWT = require('../Middlewares/AuthJWT');

router.post('/createPost', AuthJWT, uploads.single('img'), (req, res) => {
    const newPost = new postModel({
        userID: req.user.id,
        img: req.file ? {
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        } : null,
        caption: req.body.caption,
        timestamp: Date.now(),
        comments: [],
        likes: []
    });
    newPost.save((err, post) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else {
            const src = req.file ? `data:${post.img.contentType};base64,${post.img.data.toString('base64')}` : null;
            res.json({
                id: post._id,
                userID: post.userID,
                img: src,
                caption: post.caption,
                timestamp: post.timestamp,
                comments: post.comments,
                likes: post.likes
            })
        }
    });
});

router.get('/posts', AuthJWT, (req, res) => {
    postModel.find({ userID: req.user.id }, (err, posts) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else {
            const response = posts.map(post => {
                const src = post.img.contentType ? `data:${post.img.contentType};base64,${post.img.data.toString('base64')}` : null;
                return {
                    id: post._id,
                    userID: post.userID,
                    img: src,
                    caption: post.caption,
                    timestamp: post.timestamp,
                    comments: post.comments,
                    likes: post.likes
                }
            })
            res.json(response)
        }
    })
});

router.get('/likePost/:ID', AuthJWT, (req, res) => {
    postModel.findByIdAndUpdate(req.params.ID, { "$push": { likes: req.user.id } }, { new: true }, (err, post) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else res.json(post)
    })
})
router.get('/unlikePost/:ID', AuthJWT, (req, res) => {
    postModel.findByIdAndUpdate(req.params.ID, { "$pull": { likes: req.user.id } }, { new: true }, (err, post) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else res.json(post)
    })
})

router.get('/getPosts/:id', (req, res) => {
    postModel.find({ userID: req.params.id }, (err, posts) => {
        if (err) {
            res.json({ code: 500, errCode: 500, message: 'Server Error!' });
            return console.error(err);
        }
        else {
            const response = posts.map(post => {
                const src = post.img.contentType ? `data:${post.img.contentType};base64,${post.img.data.toString('base64')}` : null;
                return {
                    id: post._id,
                    userID: post.userID,
                    img: src,
                    caption: post.caption,
                    timestamp: post.timestamp,
                    comments: post.comments,
                    likes: post.likes
                }
            })
            res.json(response)
        }
    })
})



module.exports = router;