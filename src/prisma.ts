import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export const seedDb = async () => {
  // Reset dev.db with deleteMany
  await prisma.property.deleteMany({});

  const { default: data } = await import('./data/seed.json');
  data.forEach(async (row) => {
    await prisma.property.create({ data: row });
  });
};
