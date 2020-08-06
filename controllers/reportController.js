const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');

exports.getReports = catchAsync(async (req, res, next) => {
    const reports = await Report.find();

    res.status(200).json({
        status: 'success',
        reports
    })
})

exports.createReport = catchAsync(async (req, res, next) => {
    if (req.body.message) {
        let message = req.body.message
        const report = await Report.create({ message });

        return res.status(200).json({
            status: 'success',
            report
        })
    }
})

exports.deleteReport = catchAsync(async (req, res, next) => {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: null
    })
})