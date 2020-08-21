const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        enum: ['general', 'pediatre', 'gyneco', 'ophta', 'cardio', 'dermato', 'neuro', 'orl', 'nephro', 'radio', 'pneumo', 'rhumato', 'intern', 'sergeon', 'psyco'],
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    phone: [
        {
            type: Number
        }
    ],
    coordinates: [Number],
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    description: String,
    createdAt: {
        type: String,
        default: Date.now
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor