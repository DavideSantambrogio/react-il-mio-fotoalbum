const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const slugify = require('slugify');

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
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.words(3);
      const description = faker.lorem.sentence();
      const image = `https://picsum.photos/800/800?random=${Math.random()}`;
      const slug = slugify(title, { lower: true });

      const photo = await prisma.photo.create({
        data: {
          title,
          description,
          image,
          userId: admin.id,
          slug,
          categories: {
            connect: { id: categories[i].id },
          },
        },
      });

      photos.push(photo);
    }

    // Creazione dei messaggi di contatto
    const contacts = [];
    for (let i = 0; i < 20; i++) {
      const email = faker.internet.email();
      const message = faker.lorem.paragraph();
    
      try {
        const contact = await prisma.contact.create({
          data: {
            email,
            message,
          },
        });
        console.log('Created contact:', contact); // Log della creazione del contatto
        contacts.push(contact);
      } catch (error) {
        console.error('Error creating contact:', error); // Log degli errori
      }
    }
    

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
