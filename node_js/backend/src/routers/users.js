const express = require('express');
const User = require('../models/users');
const { authentication } = require('../middleware/authentication');

// Iniatializing router
const router = new express.Router();

// HTTP POST -> Create user
router.post('/api/register', async (req, res) => {
    const user = new User(req.body);
    try{
        //await user.save();
        const token = await user.GenerateToken();
        res.status(200).send({
            token
        })
    } catch(e){
        res.status(400);
    }
});

// HTTP GET -> GET USERS FOR ADMIN
router.get('/api/users', authentication, async(req, res) => {
    try{ 
        const users = await User.find();
        const filters = req.query;
        const filteredUsers = users.filter(user => {
            let isValid = true;
            for (key in filters) {
              console.log(key, user[key], filters[key]);
              isValid = isValid && user[key] == filters[key];
            }
            return isValid;
          });
        if(!users){
            throw new Error();
        }
        res.status(200).send(filteredUsers);
    } catch(e){
        res.status(500).send(e);
    }
});


// HTTP DELETE -> DELETE SPECIFIC USER
router.delete('/api/users/:id', authentication, async (req, res, next) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete({
            _id
        });
        if(!user)
            return res.status(404).send()
        res.status(204).send();
    } catch(e) {
        return res.status(400);
    }
})

// HTTP POST -> USER LOGIN
router.post('/api/users/login', async (req, res, next) => {
    try{
        const {username, password} = req.body
        console.log(username);
        const user = await User.FindByCredentials(username, password);
        const token = await user.GenerateToken();
        return res.status(200).send({
            user: user.GetPublicData(),
            token
        })
    } catch(e){
        return res.status(400)
    }
});

// HTTP -> UPDATE USER for update
router.patch('/api/users/:id', authentication, async(req, res) =>{
    const _id = req.params.id;
    const userUpdates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'city', 'gender', 'age'];
    const isAllowedToUpdate = userUpdates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if(!isAllowedToUpdate){
        return res.status(400).send({
            error: "Unable to update information"
        });
    }
    try{
        const user = await User.findOne({
            _id
        });
        if(!user)
            return res.status(404).send('User not found');

        userUpdates.forEach(el => {
            user[el] = req.body[el]
        })
        await user.save();
        res.status(204).send();
    } catch(e){
        res.status(400);
    }
});

// HTTP -> UPDATE USER (by id) with authentication
router.patch('/api/users/myaccount', authentication, async (req, res) => {
    const userUpdates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'city', 'gender', 'age'];
    const isAllowedToUpdate = userUpdates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if(!isAllowedToUpdate){
        return res.status(400).send({
            error: "Unable to update information"
        });
    }
    try{
        userUpdates.forEach((el) => {
            req.user[el] = req.body[el];
        });
        await req.user.save();
        res.status(201).send(req.user)
    } catch(e) {

    }
});

// HTTP DELETE - Delete user (by ID)
router.delete('/api/users/myaccount', authentication, (req, res) => {
    try{
        req.user.remove();
        res.status(204).send(req.user);
    } catch(e) {
        res.status(500).send();
    }
});

// HTTP GET - Get user details
router.get('/api/users/myaccount', authentication, (req, res) => {
    try{
        res.status(200).send(req.user);
    } catch(e){
        res.status(500).send(e)
    }
});

// HTTP POST - USER LOGOUT
router.post('/api/users/logout', authentication, async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(204).send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/api/users/like', authentication, async (req, res, next) => {
    try {
        const { userID, action } = req.body;
        const user = await User.findById({
            _id: userID
        });
        if(!user)
            return res.status(404).send()
        const reqUser = req.user;
        user.likes = user.likes.concat({
            like_from_id: reqUser._id
        })
        await user.save(); 
        res.status(204).send();   
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/api/users/dislike', authentication, async (req, res, next) => {
    try {
        const { userID, action } = req.body;
        const user = await User.findById({
            _id: userID
        });
        if(!user)
            return res.status(404).send()
        const reqUser = req.user;
        user.dislikes = user.dislikes.concat({
            dislike_from_id: reqUser._id
        })
        await user.save(); 
        res.status(204).send();   
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;
