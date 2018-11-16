/*Node Imports*/ 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

/*Imports Controller*/ 
var loginController = require('../controllers/login/index.js');

var loginUserValidations = [
	check('code')
		.not().isEmpty(),
];

/* Login routes */
router.post('/', loginUserValidations, loginController.loginUser);

module.exports = router;