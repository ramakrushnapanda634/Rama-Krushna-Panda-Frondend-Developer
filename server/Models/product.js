const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  id:Number,
  name:String,
  image:String,
  population: Number,
  country: String,
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;

