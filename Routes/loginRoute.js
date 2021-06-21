const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');

router.post('/login', (req, res)=>{
    userModel.findOne({email:req.body.email}, (err, user)=>{
        if(err){
            res.json({status:500, errCode : 500, message:"Internal Server Error!"});
            return console.error(err);
        }
        else{
            if(!user){
                res.json({status:404, errCode:2, message:"User Not Found!"});
            }
            else{
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
                if(!isPasswordCorrect){
                    res.json({status:404, errCode:3, message:"Incorrect Password!"});
                }
                else{
                    const JWTTOKEN = jwt.sign({id:user._id, email:user.email}, process.env.JWTSECRET);
                    res.json({status:200, JWTTOKEN});
                }
            }
        }
    });
});

module.exports = router;