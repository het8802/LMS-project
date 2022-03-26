const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/authorize.js');

const destructureErrorMsg = (error) => {
    console.log(error.errors[0].msg);
    return error.errors[0].msg
}

// require('dotenv').config();
// const JWT_secret = process.env.JWT_secret;
const JWT_secret = 'LMSproj'

router.post(
    '/createUser',
    [
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password should be alphanumeric and minimum length of 8').isAlphanumeric().isLength({min: 8}),
        body('fullname', 'enter a valid name').isLength({min: 2}),
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error: destructureErrorMsg(error)});
        }

        try{
            let user = await User.findOne({email: req.body.email});
            if (user) {
                return res.status(400).json({error: "user already exists, use a different email"});
            }

            let salt = await bcryptjs.genSalt(10);
            let encryptedPass = await bcryptjs.hash(req.body.password, salt);
            
            user = await User.create({
                email: req.body.email,
                password: encryptedPass,
                fullname: req.body.fullname,
                title: req.body.title,
                profilePic: req.body.profilePic
            })
            const data = {data: user.id};

            const authToken = jwt.sign(data, JWT_secret);
            res.json({authToken});
        }
        catch (error) {
            return res.status(500).json({error: "Internal error in occured while creating user", profilePic: req.body.profilePic});
        }
    }
)

router.post(
    '/login',
    [
        body('email', 'enter a valid email').isEmail()
    ],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({error: destructureErrorMsg(error)});
        }

        try {
            const user = await User.findOne({email: req.body.email});

            if (!user) {
                return res.status(404).json({error: "user not found"});
            }

            const comparePass = await bcryptjs.compare(req.body.password, user.password);
            if (comparePass) {
                const data = {id: user.id};
                const authToken = jwt.sign(data, JWT_secret);
                res.json(authToken);
            }
            else {
                return res.status(401).json({error: "password not matched"});
            }
        } catch {
            return res.status(500).json({error: "Internal server error occured while logging in"});
        }
    }
)

router.get(
    '/getUser', fetchUser, async (req, res) => {
        try {
            const id = req.userID;
            const user = await User.findById(id).select('-password');
            res.send(user);
        } catch {
            return res.status(500).json({error: "Internal error occured"});
        }
    }
)

module.exports = router;