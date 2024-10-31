const extend = require('lodash/extend')
const Product = require('../models/product.model')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res, next) => {

  let product = new Product(req.body)
  // product.shop_id = req.shop._id

  try {
    let savedProduct = await product.save()

    res.status(200).json(savedProduct)

  } catch (err) {
    return res.status(400).json({
      error: 'Could not create product' + errorHandler.getErrorMessage(err)
    })
  }

}

const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id).exec()
    if (!product)
      return res.status(400).json({
        error: "Product not found"
      })
    req.product = product
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve product"
    })
  }
}

const read = (req, res) => {
  return res.json(req.product)
}

const update = async (req, res) => {

  let product = req.product
  product = extend(product, req.body)
  product.updated = Date.now()

  try {
    let result = await product.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: 'Could not update product. ' + errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let product = req.product
    let deletedProduct = await Product.findByIdAndDelete(product._id)
    res.json(deletedProduct)

    if (!deletedProduct) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Could not delete Product. " + errorHandler.getErrorMessage(err),
    });
  }
}

const listByShop = async (req, res) => {
  console.log("QUE PASA CON MIS PRODUCTOSS: ",req.shop._id)
  try {
    let products = await Product.find({ shop_id: req.shop._id })
    console.log("PRODUCTOSS: ",products)
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const listLatest = async (req, res) => {
  try {
    let products = await Product.find({}).sort('-created').limit(4).exec()
    res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listProducts = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const categoryQuery = req.query.categoryId;
    let products;

    if (searchQuery) {
      // Búsqueda por nombre
      products = await Product.find({ name: { $regex: searchQuery, $options: 'i' } });
    } else if (categoryQuery) {
      // Búsqueda por categoría
      products = await Product.find({ category_id: categoryQuery });
    } else {
      // Si no hay ningún parámetro, devolver todos los productos
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve products",
    });
  }
};

const decreaseStock = async (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      "updateOne": {
        "filter": { "_id": item.product._id },
        "update": { "$inc": { "stock": -item.stock } }
      }
    }
  })
  try {
    await Product.bulkWrite(bulkOps, {})
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not update product"
    })
  }
}

const increaseStock = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.product._id, { $inc: { "stock": req.body.stock } }, { new: true })
      .exec()
    next()
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

module.exports = {
  create,
  productByID,
  read,
  update,
  remove,
  listByShop,
  listLatest,
  listProducts,
  decreaseStock,
  increaseStock
}
