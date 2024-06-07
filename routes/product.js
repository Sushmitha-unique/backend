const express = require('express')
const router = express.Router()
const product = require('../model/product')

router.post("/",async (req,res)=>{
    let Product = await product.find({});
    let id;
    if(Product.length > 0){
       let last_product_array =Product.slice(-1);
       id = last_product_array[0].id + 1;
    }
    else{
        id=1;
    }
    const prod =new product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product);
   const a1= await prod.save();
    console.log("saved");
    res.json(a1);

})

module.exports = router