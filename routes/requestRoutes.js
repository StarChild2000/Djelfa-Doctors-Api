const express = require('express');
const { getRequests, createRequest, deleteRequest, updateRequest } = require('../controllers/requestController')

const router = express.Router();

router.route('/').get(getRequests).post(createRequest);
router.route('/:id').delete(deleteRequest).patch(updateRequest);

module.exports = router