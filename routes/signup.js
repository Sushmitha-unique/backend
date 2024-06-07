const express = require('express')
const router = express.Router()
const User = require('../model/user.js')
const jwt = require('jsonwebtoken');
router.post("/",async (req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
       return  res.json({success:false,error:"User Already Exists"});
    }
    let cart = {};
    for(let i=0;i<300;i++){
        cart[i] = 0;

    }
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data ={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
})
module.exports = router