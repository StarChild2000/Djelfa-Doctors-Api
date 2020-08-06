const express = require('express');
const { getRequests, createRequest, deleteRequest } = require('../controllers/requestController')

const router = express.Router();

router.route('/').get(getRequests).post(createRequest);
router.route('/:id').delete(deleteRequest);

module.exports = router