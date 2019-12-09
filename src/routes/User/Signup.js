const express = require('express')
const router = express.Router();
const User = require('../../models/User')

router.post("/signup", (req, res, next)=>{
 const payload = req.body;
 const newUser = new User({
   username:payload.username,
   email:payload.email,
   password:payload.password
 })
 User.findOne({email:payload.email} && {username:payload.username}).then(user=>{
   if(!user){
      newUser.setPassword(payload.password)
      newUser.save()
      .then(result =>{
        res.status(201).json({message:"New user added to db", result})})
      .catch((err) => next(err))
   } else {
     res.status(409).json({message: "E-Mail or Username already exists"})
   }
 })
})

module.exports = router;