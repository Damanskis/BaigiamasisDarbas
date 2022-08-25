const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'user-c0ec6e53-91c0-4bfb-9073-ed55a1fb0933';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value == ""){
                throw new Error('Fullname field is required!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('User password contains word - password. It isn\'t allowd!');
            }
            if(value == ""){
                throw new Error('Password field is required');
            }
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    tokens: [{
        token: { 
            type: String,
            require: true
        }
    }],
    likes: [{
        like_from_id: {
            type: mongoose.Types.ObjectId
            
        }
    }],
    dislikes: [{
        dislike_from_id: {
            type: mongoose.Types.ObjectId
        }
    }],
    images: [
        {
            image: {
                type: String
            }
        }
    ]
}, {
    timestamps:true
});

userSchema.statics.FindByCredentials = async (username, pass) => {
    const user = await User.findOne({ username });
    if(!user){
        throw new Error('User does not exist. Unable to login');
    }
    const isMatched = await bcrypt.compare(pass, user.password);
    if(!isMatched){
        throw new Error('Bad credentials. Unable to login')
    }
    return user;
}

userSchema.methods.GetPublicData = function() {
    const userObject = this.toObject();
    delete userObject.password,
    delete userObject.tokens
    return userObject;
}

userSchema.methods.GenerateToken = async function(){
    const token = jwt.sign({
        _id: this._id.toString()
    }, JWT_SECRET);
    this.tokens = this.tokens.concat({
        token
    });
    await this.save();
    return token
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
});

userSchema.pre('remove', async function (next) {
    await Task.deleteMany({ author: this._id});
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
