const express = require('express')
const router = express.Router();
const User = require('../../models/User')
var bcrypt = require('bcryptjs');

router.post("/signup", (req, res, next)=>{
 const user = new User({
   username:req.body.username,
   email:req.body.email,
   password:req.body.password
 })
 User.findOne({email:req.body.email} && {username:req.body.username}).then(u=>{
   if(!u){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          user.password = hash
      })
  })
     user.save()
     .then(result =>{
       res.status(201).json({message:"New user added to db", result})})
     .catch((err) => next(err))
   } else {
     res.status(409).json({message: "Mail or Username already exists"})
   }
 }).catch((err) => console.log(err))
})
 

module.exports = router;