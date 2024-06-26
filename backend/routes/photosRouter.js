const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { createPhoto, getAllPhotos, getPhotoById, updatePhoto, deletePhoto, validatePhotoData, validatePhotoId } = require('../controllers/photoController');
const authenticateToken = require('../middlewares/auth');

const validatePhotoDataMiddleware = validatePhotoData();

const validatePhotoIdMiddleware = validatePhotoId();

// Rotte per le foto
router.post('/', authenticateToken, validatePhotoDataMiddleware, createPhoto); // Proteggi solo la creazione con autenticazione
router.get('/', getAllPhotos); // Non proteggere la route GET
router.get('/:id', validatePhotoIdMiddleware, getPhotoById);
router.put('/:id', authenticateToken, validatePhotoIdMiddleware, validatePhotoDataMiddleware, updatePhoto); // Proteggi l'aggiornamento con autenticazione
router.delete('/:id', authenticateToken, validatePhotoIdMiddleware, deletePhoto); // Proteggi l'eliminazione con autenticazione

module.exports = router;
