const express = require('express');
const router = express.Router();
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res)=>{
    let newUser = new userModel(req.body);
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    newUser.save((err, user)=>{
        if(err){
            if(err.code===11000)res.json({status:406, errCode: 1,  message:"Email Taken!"});
            else{
                res.json({status:500, errCode : 500, message:"Internal Server Error!"});
                return console.error(err);
            }
        }
        else{
            const JWTTOKEN = jwt.sign({id:user._id, email:user.email}, process.env.JWTSECRET);
            res.json({status:200, JWTTOKEN});
        }
    })
});


module.exports = router;