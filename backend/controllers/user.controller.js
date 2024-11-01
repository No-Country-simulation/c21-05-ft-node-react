const extend = require('lodash/extend')
const User = require('../models/user.model')
// const  deepMerge = require( '../helpers/utils')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res) => {
  try {
    // Verificar si ya existe un usuario con el mismo correo
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      })
    }

    // Crear nuevo usuario
    const user = new User(req.body)
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })

  } catch (err) {
    return res.status(400).json({
      error: 'Failed to create user: ' + errorHandler.getErrorMessage(err)
    })
  }
}


/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status(400).json({
        error: "User not found"
      })
    req.profile = user

    next()

  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    // user = deepMerge(user, req.body)
    // console.log(user)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await User.findByIdAndDelete(user._id)
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined

    res.json(deletedUser)

  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isSeller = (req, res, next) => {

  const isSeller = req.profile && req.profile.user_type === 'seller'
  if (!isSeller) {
    return res.status(403).json({
      error: "User is not a seller"
    })
  }
  next()
}

const isAdmin = (req, res, next) => {
  const isAdmin = req.profile && req.profile.user_type === 'admin'
  if (!isAdmin) {
    return res.status(403).json({
      error: "User is not an admin"
    })
  }
  next()
}


const createCharge = (req, res, next) => {
  // Cobro en la pasarela de pago
  console.log(`
    customer: ${req.order.payment_id}
    amount: ${req.body.amount}, 
    currency: "ars",
    `)
  next()
}

const updateFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.favorites = req.body
    await user.save()

    res.json(user.favorites)
  } catch (err) {
    return res.status(400).json({ error: 'Could not update favorites' })
  }
}

const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.favorites.pull(req.params.productId)
    await user.save()

    res.json(user.favorites)
  } catch (err) {
    return res.status(400).json({ error: 'Could not remove favorite' })
  }
}

const updateCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.cart = req.body
    await user.save()

    res.json(user.cart)
  } catch (err) {
    return res.status(400).json({ error: 'Could not update cart' })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.cart.pull({ product_id: req.params.productId })
    await user.save()

    res.json(user.cart)
  } catch (err) {
    return res.status(400).json({ error: 'Could not remove from cart' })
  }
}

module.exports = {
  create,
  read,
  update,
  remove,
  userByID,
  list,
  isSeller,
  isAdmin,
  createCharge,
  updateFavorites,
  removeFavorite,
  updateCart,
  removeFromCart
}
