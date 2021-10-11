const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

const emailValidation = joi.object({
    email: joi.string().email()
})

const userExist = (username) => {
    return User.find({
        username: username
    }).exec()
    .then( user => {
        console.log("uuusddkbdkjbd.cz", user);
        if(user){
            return user[0];
        } else{
            return false
        }
    })
}

const emailExist = (email) => {
    return User.find({
        email,
    }).exec()
    .then( user => {
        if(user){
            return user[0];
        } else{
            return false
        }
    })
}

router.route('/user/auth').post((req,res) => {
    if(req.body.username){
        const user = userExist(req.body.username);
        console.log()
        if(user){
            const validPassword = bcrypt.compare(req.body.password,user.password);
            if(validPassword){
                const token = jwt.sign({_id: user.id} , process.env.TOKEN_SECRET);
                res.send({
                    successMessage: "Successfully logged in",
                    token,
                })             
            } else{
                res.send({errorMessage : "Password is invalid"})
            }
        } else{
            res.send({errorMessage : "Username is invalid"})
        }
    } else {
        const { error } = emailValidation.validate(req.body);
        if(error){
            res.send({
                errorMessage: error.details[0].message
            })
        } else{
            const user = emailExist(req.body.email);
            if(user){
                const validPassword = bcrypt.compare(req.body.password,user.password);
                if(validPassword){
                    const token = jwt.sign({_id: user.id} , process.env.TOKEN_SECRET);
                    res.send({
                        successMessage: "Successfully logged in",
                        token,
                    })             
                } else{
                    res.send({errorMessage : "Password is invalid"})
                }
            } else{
                res.send({errorMessage : "Email is invalid"})
            }
        }
    }
})

module.exports = router;