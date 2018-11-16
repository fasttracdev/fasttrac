/*Node Imports*/ 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

/*Imports Controller*/ 
var userController = require('../controllers/users/index.js');

var createUserValidations = [
	check('first_name')
		.not().isEmpty(),
	check('last_name')
		.not().isEmpty(),
	check('email').isEmail()
		.not().isEmpty(),
	check('role')
		.not().isEmpty()
];

var updateUserValidations = [
	check('first_name')
		.not().isEmpty(),
	check('last_name')
		.not().isEmpty()
];

/* User routes */
router.post('/create', createUserValidations, userController.createUser);
router.patch('/update/:id', updateUserValidations, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/profile/:id', userController.getUserProfile);
router.get('/drivers', userController.getAllDrivers);

module.exports = router;