const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

async function createPhoto(req, res) {
  const { title, description, imageUrl, userId } = req.body;

  // Generate slug from title using slugify
  const slug = slugify(title, { lower: true });

  try {
    const newPhoto = await prisma.photo.create({
      data: {
        title,
        description,
        image: imageUrl, // Use imageUrl for the image field
        userId: parseInt(userId),
        slug,
      },
    });

    res.json(newPhoto); // Send the newly created photo as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating photo' });
  }
}

// Funzione per ottenere tutte le foto
async function getAllPhotos(req, res) {
  try {
    const photos = await prisma.photo.findMany();
    res.json(photos); // Invia tutte le foto come risposta JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero delle foto' });
  }
}

// Funzione per ottenere una singola foto per ID
async function getPhotoById(req, res) {
  const { id } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Foto non trovata' });
    }

    res.json(photo); // Invia la foto trovata come risposta JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante il recupero della foto' });
  }
}

// Funzione per aggiornare una foto esistente
async function updatePhoto(req, res) {
    const photoId = parseInt(req.params.id);
    const { title, description, imageUrl } = req.body;
  
    try {
      const updatedPhoto = await prisma.photo.update({
        where: {
          id: photoId,
        },
        data: {
          title,
          description,
          image: imageUrl,
          slug: slugify(title, { lower: true }), // Update slug if title changes
        },
      });
  
      res.json(updatedPhoto); // Send updated photo as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating photo' });
    }
  }

// Funzione per eliminare una foto esistente
async function deletePhoto(req, res) {
  const { id } = req.params;

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
};
