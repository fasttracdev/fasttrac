/*Node Imports*/
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
/*Imports Controller*/
var dashboardController = require('../controllers/dashboard/');

router.get('/driver-count', dashboardController.getDashBoard);

module.exports = router;