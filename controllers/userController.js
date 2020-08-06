const User = require('../models/userModel');
const Request = require('../models/requestModel');
const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');


exports.createAdmin = catchAsync(async (req, res, next) => {
    const { name, password, passwordConfirm, role } = req.body;
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
    const admins = await User.find({ role: 'admin' });

    res.status(200).json({
        status: 'success',
        admins
    })
})
