const express = require('express')
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')
const shopCtrl = require('../controllers/shop.controller')

const router = express.Router()

router.route('/api/shops/by/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listBySeller)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.create)

router.route('/api/shops')
  .get(shopCtrl.list)
  
router.route('/api/shops/:shopId')
  .get(shopCtrl.read)
  .put(authCtrl.requireSignin, shopCtrl.isSeller, shopCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isSeller, shopCtrl.remove)
 
router.param('shopId', shopCtrl.shopByID)
router.param('userId', userCtrl.userByID)

module.exports = router
