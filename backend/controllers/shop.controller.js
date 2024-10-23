const extend = require('lodash/extend')
const Shop = require('../models/shop.model')
const User = require('../models/user.model')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res) => {
  try {
    // Verificar si ya existe una tienda con el mismo nombre
    const existingShop = await Shop.findOne({ name: req.body.name });
    if (existingShop) {
      return res.status(400).json({
        error: 'Shop name already exists'
      });
    }

    let shop = new Shop(req.body)
    shop.seller_id = req.auth._id
    let result = await shop.save()

    // Actualizar el user_type del usuario
    let user = await User.findById(req.auth._id);
    if (user.user_type !== 'seller') {
      user.user_type = 'seller';
      await user.save();
    }

    res.status(200).json(result)

  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const shopByID = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).exec()
    if (!shop)
      return res.status(400).json({
        error: "Shop not found"
      })
    req.shop = shop
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve shop"
    })
  }
}


const read = (req, res) => {
  return res.json(req.shop)
}

const update = async (req, res) => {
  let shop = req.shop
  shop = extend(shop, req.body)
  shop.updated = Date.now()

  try {
    let result = await shop.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let shop = req.shop
    let deletedShop = await Shop.findByIdAndDelete(shop._id)

    if (!deletedShop) {
      return res.status(400).json({
        error: "Shop not found",
      });
    }

    res.json({
      message: "Shop deleted successfully",
      deletedShop,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete shop. " + errorHandler.getErrorMessage(err),
    });
  }
}

const list = async (req, res) => {
  try {
    let shops = await Shop.find()
    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listBySeller = async (req, res) => {
  try {
    let shops = await Shop.find({ seller_id: req.profile._id }).populate('seller_id', '_id name')
    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isSeller = (req, res, next) => {
  const isSeller = req.shop?.seller_id.toString() === req.auth?._id

  if (!isSeller) {
    return res.status(403).json({
      error: "User is not authorized. It's not a seller."
    })
  }
  next()
}

module.exports = {
  create,
  shopByID,
  list,
  listBySeller,
  read,
  update,
  isSeller,
  remove
}
