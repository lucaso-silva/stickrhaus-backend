const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {verifyToken, checkRole} = require("../middleware/auth");
const router = express.Router();

//Signup
router.post('/signup', async (req,res)=>{
    try{
        const { firstName, lastName, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({ error: "Email already registered."});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, passwordHash, role });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET);
        res.status(201).json({message: "New user created"});

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Signup failed'});
    }
});

//Login
router.post('/login', async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({error: 'Email not registered'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(401).json({error: 'Incorrect password.'});
        }
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7*24*60*60*1000
        })
            .json({ user });

    }catch(err){
        console.error(err);
        res.status(500).json({error:'Login failed'});
    }
});

//Me route
router.get('/me', async (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: 'Missing token'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('firstName lastName email role createdAt');
        res.json(user);
    }catch(err){
        res.status(401).json({error:'Invalid token'});
    }
})

//Admin route
router.get('/admin',  async (req,res)=>{
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({error: 'Missing token'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('firstName lastName email role createdAt');
        res.json(user);
    }catch(err){
        res.status(401).json({error:'Invalid token'});
    }
})

//Logout
router.post('/logout', (req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.json({ message: 'Logged out successfully'});
});

module.exports = router;