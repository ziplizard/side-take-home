import express from 'express';
import { propertyRoutes } from './routes';

// Did not have time to convert this to TS
const { notFound, errorHandler } = require('./middlewares');

const app = express();
app.use('/properties', propertyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
