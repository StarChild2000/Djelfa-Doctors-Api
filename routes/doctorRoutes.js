const express = require('express');
const { getAllDoctors, getDoctor, getDoctorsBySpeciality, addDoctor, editDoctor, deleteDoctor, search } = require('../controllers/doctorController')

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllDoctors).post(addDoctor)

router.route('/specialities/:spec').get(getDoctorsBySpeciality)

router.route('/search/:query').get(search)

router.route('/:id').get(getDoctor).patch(editDoctor).delete(deleteDoctor)


module.exports = router