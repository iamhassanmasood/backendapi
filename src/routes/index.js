 const express = require('express')
 const crypo = require('crypto');
 const router = express.Router();
 const User = require('../models/User')
 

router.post("/register", (req, res, next)=>{
  const user = new User({
    email:"iamhassanmasood@gmail.com",
    password:"test"
  })
  user.save()
  .then(result =>{
    console.log(result)
    res.status(201).json({message:"New user added to db"})})
  .catch((err) => next(err))
})
  

 module.exports = router;

