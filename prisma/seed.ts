import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  });

  // Create books
  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '1984',
      author: 'George Orwell',
      rating: 5.0,
    },
  });

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      rating: 4.5,
    },
  });

  const book3 = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: 4.2,
    },
  });

  console.log('Seed data created successfully');
  console.log({ user1, user2, book1, book2, book3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
