const express = require('express')
const router = express.Router()
const User = require('../model/user.js')
const jwt = require('jsonwebtoken');
router.post("/",async (req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passcompare = req.body.password === user.password;
        if(passcompare)
            {
                const data ={
                    user:{
                        id:user.id
                    }
                }
                  
           const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
            }
            else{
                res.json({success:false,error:"wrong password"})
            }
    }
    else{
        res.json({success:false,error:"Sign up before login"})
    }
  
  
})
module.exports = router