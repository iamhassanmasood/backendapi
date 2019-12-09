const express = require('express')
const router = express.Router();
const User = require('../../models/User')

router.post("/login", (req, res, next) => {
    const payload = req.body;

    User.findOne({email:payload.email})
    .then(user=>{
        if(!user) res.status(401).json({message: "Auth Failed"})  
        else {
            if (user.validatePassword(req.body.password)) { 
                const token = user.generateJWT()
                return res.status(201).send({ 
                    message: "Login success", 
                    token
                }) 
            } else { 
                return res.status(400).send({ 
                    error : "Auth Failed"
                }); 
            } 
           } 

        }
    )
    .catch(err=> console.log(err))
  });
  
module.exports = router;