const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');

// Middleware per validare i dati della categoria
const validateCategoryData = () => [
  body('name').notEmpty().withMessage('Il nome della categoria è obbligatorio'),
];

// Middleware per validare l'ID della categoria nei parametri della richiesta
const validateCategoryId = () => [
  param('id').isInt({ min: 1 }).withMessage('L\'ID della categoria non è valido'),
];

// Controller per creare una nuova categoria
async function createCategory(req, res) {
  const { name } = req.body;

 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante la creazione della categoria' });
  }
}

// Controller per ottenere tutte le categorie
async function getAllCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero delle categorie' });
  }
}

// Controller per eliminare una categoria esistente
async function deleteCategory(req, res) {
  const { id } = req.params;

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Categoria eliminata con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione della categoria' });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  validateCategoryData,
  validateCategoryId,
};
