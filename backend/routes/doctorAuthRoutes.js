const express = require('express');
const router = express.Router();
const { registerDoctor, loginDoctor } = require('../controller/doctorAuthController');

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

module.exports = router; 