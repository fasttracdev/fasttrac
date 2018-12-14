/*Node Imports*/ 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const usersTableDB = require('../models/users');
/*Imports Controller*/ 
var userController = require('../controllers/users/index.js');

/**
 * Create Validation
 */
var createUserValidations = [
	check('first_name')
		.not().isEmpty(),
	check('last_name')
		.not().isEmpty(),
	check('role')
	 .not().isEmpty(),
	check('email').not().isEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.').custom(email => { return customEmailUniqueValidate(email) }),
	check('driver_id').custom(driver_id => { return customDriverIDUniqueValidate(driver_id) }),
];

/**
 * Update validation
 */
var updateUserValidations = [
	check('first_name')
		.not().isEmpty(),
	check('last_name')
		.not().isEmpty()
];

var createEmailvalidation = [
	check('email').not().isEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.')
];

/**
 * Unique Email
 * @param {*} email 
 */
function customEmailUniqueValidate(email) {	
	return usersTableDB.checkEmail({email: email}).then(email => {
		if (email.length > 0) {
			return Promise.reject('E-mail already in use');
		}
	});
}

/**
 * Unique Driver Id
 * @param {*} driver_id 
 */
function customDriverIDUniqueValidate(driver_id) {
	return usersTableDB.checkDriverId({driver_id: driver_id}).then(driver_id => {
		if (driver_id.length > 0) {
			return Promise.reject('User already exists');
		}
	});
}


/* User routes */
router.post('/create', createUserValidations, userController.createUser);
router.patch('/update/:id', updateUserValidations, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/profile/:id', userController.getUserProfile);
router.get('/drivers', userController.getAllDrivers);
router.get('/download-drivers', userController.exportDrivers);
router.post('/forgot-password', createEmailvalidation, userController.resetPassword);

module.exports = router;