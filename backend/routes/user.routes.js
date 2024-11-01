const express = require('express');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.route('/api/users/:userId/favorites')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateFavorites);
  
router.route('/api/users/:userId/favorites/:productId')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.removeFavorite);

router.route('/api/users/:userId/cart')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateCart);

router.route('/api/users/:userId/cart/:productId')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.removeFromCart);

router.param('userId', userCtrl.userByID);

module.exports = router;

