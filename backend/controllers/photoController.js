const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');

// Middleware per validare i dati della foto
const validatePhotoData = () => [
  body('title').notEmpty().withMessage('Il titolo è obbligatorio'),
  body('description').notEmpty().withMessage('La descrizione è obbligatoria'),
  body('imageUrl').isURL().withMessage('L\'URL dell\'immagine non è valido'),
  body('userId').isInt({ min: 1 }).withMessage('L\'ID utente non è valido'),
];

// Middleware per validare l'ID della foto nei parametri della richiesta
const validatePhotoId = () => [
  param('id').isInt({ min: 1 }).withMessage('L\'ID della foto non è valido'),
];

// Controller per creare una nuova foto
async function createPhoto(req, res) {
  const { title, description, imageUrl, userId } = req.body;

  // Generate slug from title using slugify
  const slug = slugify(title, { lower: true });


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPhoto = await prisma.photo.create({
      data: {
        title,
        description,
        image: imageUrl,
        userId: parseInt(userId),
        slug,
      },
    });

    res.json(newPhoto); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante la creazione della foto' });
  }
}

// Controller per ottenere tutte le foto
async function getAllPhotos(req, res) {
  try {
    const photos = await prisma.photo.findMany();
    res.json(photos); // Send all photos as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero delle foto' });
  }
}

// Controller per ottenere una singola foto per ID
async function getPhotoById(req, res) {
  const { id } = req.params;

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Foto non trovata' });
    }

    res.json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero della foto' });
  }
}

// Controller per aggiornare una foto esistente
async function updatePhoto(req, res) {
  const photoId = parseInt(req.params.id);
  const { title, description, imageUrl } = req.body;

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedPhoto = await prisma.photo.update({
      where: {
        id: photoId,
      },
      data: {
        title,
        description,
        image: imageUrl,
        slug: slugify(title, { lower: true }),
      },
    });

    res.json(updatedPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento della foto' });
  }
}

// Controller per eliminare una foto esistente
async function deletePhoto(req, res) {
  const { id } = req.params;

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await prisma.photo.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Foto eliminata con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione della foto' });
  }
}

module.exports = {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
  validatePhotoData,
  validatePhotoId,
};
