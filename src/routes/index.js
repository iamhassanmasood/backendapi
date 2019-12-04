const express = require('express')
const router = express.Router()

const signup = require('./User/Signup')

router.use('/api', signup);
router.use('/', signup)

module.exports = router;