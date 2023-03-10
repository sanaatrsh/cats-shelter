const express = require('express');
const shelterController = require('../controllers/shelter')
const router = express.Router();

router.get('/', shelterController.getIndex);

module.exports = router;