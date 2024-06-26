const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { createPhoto, getAllPhotos, getPhotoById, updatePhoto, deletePhoto, validatePhotoData, validatePhotoId } = require('../controllers/photoController');

router.post('/', validatePhotoData(), createPhoto);

router.get('/', getAllPhotos);

router.get('/:id', validatePhotoId(), getPhotoById);

router.put('/:id', validatePhotoId(), validatePhotoData(), updatePhoto);

router.delete('/:id', validatePhotoId(), deletePhoto);

module.exports = router;
