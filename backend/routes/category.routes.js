const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller'); // Ajusta la ruta según tu estructura de proyecto
const userCtrl = require("../controllers/user.controller")
const authCtrl = require("../controllers/auth.controller")

// Ruta para crear una nueva categoría
router.route('/api/categories')
  .post(categoryCtrl.create)
  .get(categoryCtrl.list);
// .post(authCtrl.requireSignin, userCtrl.isAdmin,categoryCtrl.create);


// Ruta para obtener, actualizar y eliminar una categoría por ID
router.route('/api/categories/:categoryId')
  .get(categoryCtrl.read)
  .put(categoryCtrl.update)
  .delete(categoryCtrl.remove);
// .put(authCtrl.requireSignin, userCtrl.isAdmin, categoryCtrl.update)
// .delete(authCtrl.requireSignin, userCtrl.isAdmin, categoryCtrl.remove);

// Middleware para obtener la categoría por ID
router.param('categoryId', categoryCtrl.categoryByID);

module.exports = router;
