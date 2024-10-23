const express = require('express');
const router = express.Router();
const newsCarouselCtrl = require('../controllers/news-carousel.controller');

// Ruta para crear un nuevo elemento del carrusel de noticias
router.post('/api/news-carousel', newsCarouselCtrl.create);

// Ruta para obtener la lista de elementos del carrusel de noticias
router.get('/api/news-carousel', newsCarouselCtrl.list);

// Ruta para obtener, actualizar y eliminar un elemento del carrusel de noticias por ID
router.route('/api/news-carousel/:newsId')
  .get(newsCarouselCtrl.read)
  .put(newsCarouselCtrl.update)
  .delete(newsCarouselCtrl.remove);

// Middleware para obtener el elemento del carrusel de noticias por ID
router.param('newsId', newsCarouselCtrl.newsByID);

module.exports = router;
