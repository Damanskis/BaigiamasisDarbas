const jwt = require('jsonwebtoken');
const User = require('../models/users');

// TODO: Put into ENV file
const JWT_SECRET = 'user-c0ec6e53-91c0-4bfb-9073-ed55a1fb0933' 

const authentication = async(req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        });
        if(!user){
            throw new Error('ERROR! User not found!');
        }
        req.token = token;
        req.user = user;
        next();
    } catch(e){
        return res.status(401).send({
            error: "ERROR! User not authenticated."
        });
    }
}

module.exports = { authentication }
