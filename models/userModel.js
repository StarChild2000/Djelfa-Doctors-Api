const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must not be less than 8 caracters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must not be less than 8 caracters'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords do not match!'
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'super admin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined

    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);
module.exports = User