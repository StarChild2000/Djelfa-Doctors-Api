const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.createAdmin = catchAsync(async (req, res, next) => {
    console.log(req.body)
    if (!req.body.admin) return (next(new AppError('You are not logged in!', 401)))
    if (req.body.admin.role !== 'super admin') return (next(new AppError('You dont have the permission to prefom this action', 401)))
    const { name, password, passwordConfirm, role } = req.body.newAdmin;
    const admin = await User.create({ name, passwordConfirm, password, role });
    admin.password = undefined
    res.status(201).json({
        status: 'success',
        admin
    })
})

exports.deleteAdmin = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: null
    })
})

exports.getAllAdmins = catchAsync(async (req, res, next) => {
    if (!req.body.user) return next(new AppError('You are not logged in', 401))
    if (req.body.user.role !== 'super admin') return next(new AppError('You dont have the permission to prefom this action', 401))
    const admins = await User.find({ role: 'admin' });

    res.status(200).json({
        status: 'success',
        admins
    })
})
