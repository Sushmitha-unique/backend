const express = require('express')
const router = express.Router()
const product = require('../model/product')
router.get("/",async (req,res)=>{
   let prod = await product.find({});
   console.log("All Products fetched");
   res.send(prod) 
   
})
module.exports = router