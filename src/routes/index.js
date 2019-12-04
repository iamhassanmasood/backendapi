const express = require('express')
const router = express.Router()

const signup = require('./User/Signup')

router.use('/api', signup);

module.exports = router;