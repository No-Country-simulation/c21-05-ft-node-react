const express = require('express')
const productCtrl = require('../controllers/product.controller')
const authCtrl = require('../controllers/auth.controller')
const shopCtrl = require('../controllers/shop.controller')

const router = express.Router()

router.route('/api/products/by/:shopId')
  .post(authCtrl.requireSignin, shopCtrl.isSeller, productCtrl.create)
  .get(productCtrl.listByShop)

router.route('/api/products/latest')
  .get(productCtrl.listLatest)

router.route('/api/products/:productId')
  .get(productCtrl.read)

router.route('/api/product/:shopId/:productId')
  .put(authCtrl.requireSignin, shopCtrl.isSeller, productCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isSeller, productCtrl.remove)

router.route('/api/products')
  .get(productCtrl.listProducts)

router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)

module.exports = router
