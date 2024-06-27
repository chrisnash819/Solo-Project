const express = require('express');
const router = express.Router();
const {getLocationData} = require('../controllers/locationController');
const locationController = require('../controllers/locationController');

router.get('/:location', locationController.getTaxData, locationController.getCivicStats);

module.exports = router;