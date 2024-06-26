// Import dei moduli necessari
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter');
const photoRoutes = require('./routes/photosRouter');
const categoryRoutes = require('./routes/categoriesRouter');
const authenticateToken = require('./middlewares/auth');

// Carica le variabili d'ambiente da .env
dotenv.config();

// Inizializza l'app Express
const app = express();

// Middleware per il parsing del body delle richieste JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte per l'autenticazione
app.use('/api/auth', authRoutes);

// Rotte per le foto (protette da autenticazione)
app.use('/api/photos', authenticateToken, photoRoutes);

// Rotte per le categorie (protette da autenticazione)
app.use('/api/categories', authenticateToken, categoryRoutes);

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
