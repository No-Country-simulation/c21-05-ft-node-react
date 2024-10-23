const  mongoose = require( 'mongoose')

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  quantity: Number,
  shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
})

const OrderItem = mongoose.model('OrderItem', OrderItemSchema)

const OrderSchema = new mongoose.Schema({
  products: [OrderItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  delivery_address: {
    street: { type: String, required: 'Street is required' },
    city: { type: String, required: 'City is required' },
    state: { type: String },
    zipcode: { type: String, required: 'Zip Code is required' },
    country: { type: String, required: 'Country is required' }
  },
  payment_id: {},
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, OrderItem }
