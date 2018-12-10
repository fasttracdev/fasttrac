/*Node Imports*/ 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

/*Imports Controller*/ 
var fasttacController = require('../controllers/fasttrac/index.js');

/* Fasttac routes */
router.get('/drivers', fasttacController.getDrivers);
router.get('/sync-drivers', fasttacController.syncDrivers);
router.get('/sync-driver-report', fasttacController.syncDriverReport);
router.get('/drivers-report', fasttacController.getAllDriversReport);
router.get('/driver-report', fasttacController.getDriverReport);
router.get('/download-drivers-report', fasttacController.exportDriversReport);
router.get('/download-driver-report', fasttacController.exportDriverReport);

module.exports = router;