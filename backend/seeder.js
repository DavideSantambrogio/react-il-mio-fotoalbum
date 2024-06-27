const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const slugify = require('slugify');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  try {
    // Creazione dell'utente admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        password: 'adminpassword',
      },
    });

    // Creazione delle categorie
    const categoryNames = [
      'Nature',
      'Travel',
      'Food',
      'Technology',
      'Art',
      'Sports',
      'Fashion',
      'Music',
      'Books',
      'Movies',
    ];

    const categories = [];
    for (let i = 0; i < categoryNames.length; i++) {
      const category = await prisma.category.create({
        data: {
          name: categoryNames[i],
        },
      });
      categories.push(category);
    }

    console.log('Categories seeded successfully:', categories);

    // Creazione delle foto
    const photos = [];
    for (let i = 1; i <= 10; i++) {
      const title = faker.lorem.words(3);
      const description = faker.lorem.sentence();
      const slug = slugify(title, { lower: true });
      const categoryId = categories[Math.floor(Math.random() * categories.length)].id; // Scelgo casualmente una categoria

      // Calcolo del numero randomico basato sull'hash del titolo della foto
      const hash = crypto.createHash('md5').update(title).digest('hex');
      const randomNum = parseInt(hash.substring(0, 8), 16); // Prendi i primi 8 caratteri dell'hash e converti in numero

      const image = `https://picsum.photos/800/800?random=${randomNum}`;

      const photo = await prisma.photo.create({
        data: {
          title,
          description,
          image,
          userId: admin.id,
          slug,
          categoryId, // Collego la foto alla categoria scelta casualmente
        },
      });

      photos.push(photo);
    }

    console.log('Photos seeded successfully:', photos);

    // Creazione dei messaggi di contatto
    const contacts = [];
    for (let i = 1; i <= 20; i++) {
      const email = faker.internet.email();
      const message = faker.lorem.paragraph();

      const contact = await prisma.contact.create({
        data: {
          email,
          message,
        },
      });

      contacts.push(contact);
    }

    console.log('Contacts seeded successfully:', contacts);

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
