const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.send('<h1>Benvenuto nel mio blog!</h1>');
});


// Gestione della favicon
app.get('/favicon.ico', (req, res) => {
    res.status(404).send('Favicon not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
