const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

// Funzione per creare un nuovo messaggio di contatto
async function createContact(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, message } = req.body;

  try {
    const newContact = await prisma.contact.create({
      data: {
        email,
        message,
      },
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante la creazione del messaggio di contatto' });
  }
}

// Funzione per ottenere tutti i messaggi di contatto
async function getAllContacts(req, res) {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts); // Invia tutti i messaggi di contatto come risposta JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero dei messaggi di contatto' });
  }
}

// Funzione per ottenere un singolo messaggio di contatto per ID
async function getContactById(req, res) {
  const { id } = req.params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Messaggio di contatto non trovato' });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero del messaggio di contatto' });
  }
}

// Funzione per eliminare un messaggio di contatto per ID
async function deleteContact(req, res) {
  const { id } = req.params;

  try {
    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Messaggio di contatto eliminato con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'eliminazione del messaggio di contatto' });
  }
}

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
