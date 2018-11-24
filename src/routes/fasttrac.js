/*Node Imports*/ 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

/*Imports Controller*/ 
var fasttacController = require('../controllers/fasttrac/index.js');

/* Fasttac routes */
router.get('/drivers', fasttacController.getDrivers);
router.get('/sync-drivers', fasttacController.syncDrivers);

module.exports = router;