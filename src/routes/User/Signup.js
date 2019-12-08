const express = require('express')
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs');

router.post("/signup", (req, res, next)=>{
 const payload = req.body;
 const user = new User({
   username:payload.username,
   email:payload.email,
   password:payload.password
 })
 User.findOne({email:payload.email} && {username:payload.username}).then(u=>{
   if(!u){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(payload.password, salt, function(err, hash) {
        if(err) throw new Error(err)
          user.password = hash
          user.save()
          .then(result =>{
            res.status(201).json({message:"New user added to db", result})})
          .catch((err) => next(err))
      })
  })
   } else {
     res.status(409).json({message: "E-Mail or Username already exists"})
   }
 })
})

module.exports = router;