const Doctor = require('../models/DoctorModel');
const Request = require('../models/requestModel');
const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllDoctors = catchAsync(async (req, res, next) => {
    const doctors = await Doctor.find();

    res.status(200).json({
        status: 'success',
        num: doctors.length,
        doctors
    })
})

exports.getDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        doctor
    })
})

exports.getDoctorsBySpeciality = catchAsync(async (req, res, next) => {

    const doctors = await Doctor.find({ speciality: req.params.spec }).select('name gender');

    res.status(200).json({
        status: 'success',
        num: doctors.length,
        doctors
    })
})

exports.addDoctor = catchAsync(async (req, res, next) => {
    let doctor = {};
    if (req.body.name) doctor.name = req.body.name
    if (req.body.speciality) doctor.speciality = req.body.speciality
    if (req.body.adress) doctor.adress = req.body.adress
    if (req.body.phone) doctor.phone = req.body.phone
    if (req.body.coordinates) doctor.coordinates = req.body.coordinates
    if (req.body.gender) doctor.gender = req.body.gender
    if (req.body.description) doctor.description = req.body.description

    const newDoctor = await Doctor.create(doctor);

    res.status(200).json({
        status: 'success',
        doctor: newDoctor
    })

})

exports.editDoctor = catchAsync(async (req, res, next) => {

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        doctor
    })
})

exports.deleteDoctor = catchAsync(async (req, res, next) => {
    if (req.body.user.role !== 'super admin') {
        return next(new AppError('You dont have the permission to preform this action', 401))
    }
    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        data: null
    })
})

exports.search = catchAsync(async (req, res, next) => {
    const query = req.params.query;
    // regular expression that starts with a variable & ignoring the case
    const regExp = new RegExp('^' + query, 'i')

    const doctors = await Doctor.find({ name: regExp }).select('name description gender');

    res.status(200).json({
        status: 'success',
        doctors
    })
})

exports.getStats = catchAsync(async (req, res, next) => {
    const recentDoctors = await Doctor.find().sort('-createdAt').select('name _id gender description').limit(4);
    const requests = await Request.find();
    const reports = await Report.find();
    const doctors = await Doctor.find();

    res.status(200).json({
        status: 'success',
        data: {
            recentDoctors,
            totalDoctors: doctors.length,
            totalRequests: requests.length,
            totalReports: reports.length
        }

    })
})