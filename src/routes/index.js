const express = require('express')
const router = express.Router()

const signup = require('./User/Signup')
const login = require('./User/Login')

router.use('/api', signup);
router.use('/api', login);

module.exports = router;