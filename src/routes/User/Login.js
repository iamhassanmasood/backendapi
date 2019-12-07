const express = require('express')
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = ('jsonwebtoken')

router.post("/login", (req, res, next) => {
    const payload = req.body;
    User.findOne({email:payload.email})
    .then(user=>{
        if(!user){
            res.status(401).json({message: "Auth Failed"})
        } else {
            bcrypt.compare(payload.password, user.password, function(err, results){
                if(err){
                    throw new Error(err)
                 }
                 if (results) {
                    return res.status(200).json({ message: "Login success" })
                } else {
                    return res.status(401).json({ message: "Invalid credencial" })
                }
               })
            }
        }
    )
    .catch(err=> console.log(err))
  });
  
module.exports = router;