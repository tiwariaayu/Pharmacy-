const express = require('express');
const router = express.Router();
const { registerNurse, loginNurse } = require('../controller/nurseAuthController');

router.post('/register', registerNurse);
router.post('/login', loginNurse);

module.exports = router; 