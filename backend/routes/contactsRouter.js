const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {  createContact,  getAllContacts,  getContactById,  deleteContact} = require('../controllers/contactController');

// Middleware per il parsing del body delle richieste JSON
router.use(express.json());

// Rotte per i messaggi di contatto
router.post('/', [
  body('email').isEmail().withMessage('Inserisci un indirizzo email valido'),
  body('message').trim().notEmpty().withMessage('Il messaggio non può essere vuoto'),
], createContact);

router.get('/', getAllContacts);

router.get('/:id', getContactById);

router.delete('/:id', deleteContact);

module.exports = router;
