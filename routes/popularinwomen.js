const express = require('express')
const router = express.Router()
const product = require('../model/product')
router.get("/",async (req,res)=>{
   let prod = await product.find({category:"women"});
  let popularinwomen = prod.slice(0,4);
  res.send(popularinwomen);
   
})
module.exports = router