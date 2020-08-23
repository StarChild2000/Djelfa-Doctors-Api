const express = require('express');
const { protect, restricTo, signUp, login, logout } = require('../controllers/authController');
const { createAdmin, deleteAdmin, getAllAdmins } = require('../controllers/userController')

const router = express.Router();

router.route('/').patch(getAllAdmins).post(createAdmin)
router.route('/login').post(login)
router.route('/logout').get(logout);
router.route('/:id').post(deleteAdmin);


module.exports = router;