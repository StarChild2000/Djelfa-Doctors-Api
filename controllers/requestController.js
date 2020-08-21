const Request = require('../models/requestModel');
const catchAsync = require('../utils/catchAsync');

exports.getRequests = catchAsync(async (req, res, next) => {
    const requests = await Request.find().sort('-createdAt').populate('responsible');

    res.status(200).json({
        status: 'success',
        requests
    })
})

exports.createRequest = catchAsync(async (req, res, next) => {
    let request = {};
    if (req.body.name) request.name = req.body.name;
    if (req.body.adress) request.adress = req.body.adress;

    const newRequest = await Request.create(request);
    res.status(200).json({
        status: 'success',
        request: newRequest
    })
})

exports.deleteRequest = catchAsync(async (req, res, next) => {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: null
    })
})

exports.updateRequest = catchAsync(async (req, res, next) => {
    await Request.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        message: 'Request Updated'
    })
})