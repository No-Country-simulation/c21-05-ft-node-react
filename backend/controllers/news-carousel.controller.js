const NewsCarousel = require('../models/news-carousel.model');  
const errorHandler = require('./../helpers/dbErrorHandler')

// Crear un nuevo elemento del carrusel de noticias
const create = async (req, res) => {
  const newsItem = new NewsCarousel(req.body);
  try {
    await newsItem.save();
    res.status(200).json(newsItem);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo crear el elemento del carrusel de noticias. \n" + errorHandler(error)
    });
  }
};

// Obtener lista de elementos del carrusel de noticias
const list = async (req, res) => {
  try {
    const newsItems = await NewsCarousel.find().exec();
    res.status(200).json(newsItems);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudieron obtener los elementos del carrusel de noticias"
    });
  }
};

// Obtener un elemento del carrusel de noticias por ID
const newsByID = async (req, res, next, id) => {
  try {
    const newsItem = await NewsCarousel.findById(id).exec();
    if (!newsItem) {
      return res.status(400).json({
        error: "Elemento del carrusel de noticias no encontrado"
      });
    }
    req.newsItem = newsItem;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Error al buscar el elemento del carrusel de noticias"
    });
  }
};

// Leer un elemento del carrusel de noticias
const read = (req, res) => {
  return res.json(req.newsItem);
};

// Actualizar un elemento del carrusel de noticias
const update = async (req, res) => {
  try {
    let newsItem = req.newsItem;
    newsItem = Object.assign(newsItem, req.body);
    await newsItem.save();
    res.status(200).json(newsItem);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo actualizar el elemento del carrusel de noticias"
    });
  }
};

// Eliminar un elemento del carrusel de noticias
const remove = async (req, res) => {
  try {
    const newsItem = req.newsItem;
    const deletedNewsItem = await  NewsCarousel.findByIdAndDelete(newsItem._id) 
    res.status(200).json(deletedNewsItem);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo eliminar el elemento del carrusel de noticias"
    });
  }
};

module.exports = {
  create,
  list,
  newsByID,
  read,
  update,
  remove
};
