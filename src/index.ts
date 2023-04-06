import app from './app';
import { seedDb } from './prisma';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await seedDb();
    console.log('Database populated with test data');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
})();
