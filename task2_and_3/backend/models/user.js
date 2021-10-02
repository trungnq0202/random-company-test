const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Username must be unique!']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },

    birthdate:{
        type: Date,
        required: true,

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;