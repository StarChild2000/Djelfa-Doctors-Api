const express = require('express');
const { getReports, createReport, deleteReport } = require('../controllers/reportController');
const { route } = require('./doctorRoutes');

const router = express.Router();

router.route('/').get(getReports).post(createReport);
router.route('/:id').delete(deleteReport);

module.exports = router;