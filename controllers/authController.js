const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util')

const signJwt = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signJwt(user);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000
        ),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions)
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        user
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm, role } = req.body;
    const newUser = await User.create({ name, email, password, passwordConfirm, role });

    createSendToken(newUser, 201, res);
})

exports.login = catchAsync(async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) return (next(new AppError('Please Provide Your Credentials', 400)))

    const user = await User.findOne({ name }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError('Invalide Name or Password', 401));

    createSendToken(user, 200, res)
})

exports.logout = (req, res) => {
    res.cookie('jwt', 'logged out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    // getting the token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) token = req.cookies.jwt

    if (!token) return next(new AppError('You are not logged in!', 400))

    // decode the token and check if its valide
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(new AppError('User not found!', 400));

    // if everything ok return the user
    req.user = currentUser

    next();
})

exports.restricTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have the permission to preform this action', 403))
        }
        next()
    }
}