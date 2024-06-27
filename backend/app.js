const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRouter');
const photoRoutes = require('./routes/photosRouter');
const categoryRoutes = require('./routes/categoriesRouter');
const contactRoutes = require('./routes/contactsRouter');

// Carica le variabili d'ambiente da .env
dotenv.config();

// Inizializza l'app Express
const app = express();

// Abilita CORS per tutte le richieste
app.use(cors());

// Middleware per il parsing del body delle richieste JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte per l'autenticazione
app.use('/api/auth', authRoutes);

// Rotte per le foto (protette da autenticazione, tranne GET)
app.use('/api/photos', photoRoutes);

// Rotte per le categorie (accesso pubblico)
app.use('/api/categories', categoryRoutes);

// Rotta per i messaggi di contatto
app.use('/api/contacts', contactRoutes);

// Gestione della richiesta per favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Favicon non trovato');
});

// Porta del server
const PORT = process.env.PORT || 3000;

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
