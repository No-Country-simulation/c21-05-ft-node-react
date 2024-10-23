const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  stock: {
    type: Number,
    required: "Stock is required"
  },
  color: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  shop_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop'
  },
  category_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
})

module.exports = mongoose.model('Product', ProductSchema)
