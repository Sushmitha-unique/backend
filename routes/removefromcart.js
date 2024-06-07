const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../model/user')
const fetchUser = async (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.send({errors:"please authenticate using valid token"})
}
else{
    try{
      const data = jwt.verify(token,'secret_ecom');
      
      req.user = data.user;
      console.log(req.body,req.user)
      next();
    }
    catch(error){
     res.send({error:"please authenticate"})
    }
}
}

router.post("/",fetchUser,async (req,res)=>{
  let userData = await  User.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemid]>0)
  userData.cartData[req.body.itemid]-=1;
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Remove")
})
module.exports = router