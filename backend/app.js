// Import dei moduli necessari
const express = require('express');
const dotenv = require('dotenv');
const photoRoutes = require('./routes/photos'); // Importa le rotte delle foto

// Carica le variabili d'ambiente da .env
dotenv.config();

// Inizializza l'app Express
const app = express();

// Middleware per il parsing del body delle richieste JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte per le foto - Utilizza il percorso /api/photos
app.use('/api/photos', photoRoutes);

// Rotte per le categorie
const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

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
