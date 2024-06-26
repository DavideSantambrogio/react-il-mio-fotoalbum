const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

async function main() {
  try {
    // Inserimento degli utenti
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User 1',
        password: 'password1',
      },
    });

    // Inserimento delle categorie
    const category1 = await prisma.category.create({
      data: {
        name: 'Nature',
      },
    });

    const category2 = await prisma.category.create({
      data: {
        name: 'Travel',
      },
    });

    // Inserimento delle foto
    const photo1 = await prisma.photo.create({
      data: {
        title: 'Beautiful Sunset',
        description: 'A stunning sunset over the ocean',
        image: 'https://example.com/sunset.jpg',
        userId: user1.id,
        slug: slugify('Beautiful Sunset', { lower: true }),
        categories: {
          connect: [{ id: category1.id }],
        },
      },
    });

    // Inserimento dei messaggi di contatto
    const contact1 = await prisma.contact.create({
      data: {
        email: 'user@example.com',
        message: 'Hello, I love your photos!',
      },
    });

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
