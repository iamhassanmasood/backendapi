 const express = require('express')
 const crypo = require('crypto');
 const router = express.Router();
 const User = require('../models/User')
 

router.post("/register", (req, res, next)=>{
  const user = new User({
    email:req.body.email,
    password:req.body.password
  })
  User.findOne({email:req.body.email}).then(u=>{
    if(!u){
      user.save()
      .then(result =>{
        console.log(result)
        res.status(201).json({message:"New user added to db"})})
      .catch((err) => next(err))
    } else {
      res.status(409).json({message: "User already exist with this email"})
    }
  })
})
  

 module.exports = router;

