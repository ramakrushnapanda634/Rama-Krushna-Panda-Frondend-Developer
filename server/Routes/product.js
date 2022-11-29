const { Router } = require("express");
const ProductModel = require("../Models/product");
const router = Router();
router.post("/product/new", async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(200).json({ success: true, product });
});
router.get("/products",async(req,res)=>{
  const products=await ProductModel.find();
  res.status(200).json({success:true,products}) 
})
module.exports = router;