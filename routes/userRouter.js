const express = require('express');
const { protect, restricTo, signUp, login, logout } = require('../controllers/authController');
const { createAdmin, deleteAdmin, getAllAdmins } = require('../controllers/userController')

const router = express.Router();

router.route('/').get(protect, restricTo('super admin'), getAllAdmins).post(protect, restricTo('super admin'), createAdmin)
router.route('/login').post(login)
router.route('/logout').get(logout);
router.route('/:id').delete(protect, restricTo('super admin'), deleteAdmin);


module.exports = router;