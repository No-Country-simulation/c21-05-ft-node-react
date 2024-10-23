const mongoose = require( 'mongoose')

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  seller_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  logo_url: {
    type: String,
    trim: true
  },
  cover_url: {
    type: String,
    trim: true
  },
})

module.exports = mongoose.model('Shop', ShopSchema)
