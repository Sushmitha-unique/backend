const express = require('express')
const router = express.Router()
const product = require('../model/product')
router.post("/",async (req,res)=>{
    await product.findOneAndDelete({id:req.body.id});
    res.json({
        message:"product deleted successfully"
    })
})
module.exports = router