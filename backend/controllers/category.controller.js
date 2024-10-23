const Category = require('../models/category.model'); // Ajusta la ruta según tu estructura de proyecto

// Crear nueva categoría
const create = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo crear la categoría"
    });
  }
};

// Obtener lista de categorías
const list = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudieron obtener las categorías"
    });
  }
};

// Obtener categoría por ID
const categoryByID = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      return res.status(400).json({
        error: "Categoría no encontrada"
      });
    }
    req.category = category;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Error al buscar la categoría"
    });
  }
};

// Leer categoría
const read = (req, res) => {
  return res.json(req.category);
};

// Actualizar categoría
const update = async (req, res) => {
  try {
    let category = req.category;
    category = Object.assign(category, req.body);
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo actualizar la categoría"
    });
  }
};

// Eliminar categoría
const remove = async (req, res) => {
  try {
    const category = req.category;
    const deletedCategory = await category.remove();
    res.status(200).json(deletedCategory);
  } catch (err) {
    return res.status(400).json({
      error: "No se pudo eliminar la categoría"
    });
  }
};

module.exports = {
  create,
  list,
  categoryByID,
  read,
  update,
  remove
};
