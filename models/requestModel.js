const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['not handled', 'in progress', 'done'],
        default: 'not handled'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    responsible: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    }
})

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;