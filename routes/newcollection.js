const express = require('express')
const router = express.Router()
const product = require('../model/product')
router.get("/",async (req,res)=>{
   let prod = await product.find({});
  let newcollection = prod.slice(1).slice(-8);
  res.send(newcollection);
   
})
module.exports = router