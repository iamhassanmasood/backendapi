const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/register', async (req, res) => {

   const newUser = new User({
     username : req.body.username,
     email: req.body.email,
     password: req.body.password
   })
   await newUser.save().then( ()=>{
     res.status(200).json(newUser);
   }).catch(err=> console.log(err))

})
router.get('/', (req, res, next)=>{
  res.send("<h1>Hello / </h1>")
})
module.exports = router;