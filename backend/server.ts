import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './src/middleware/error-middleware';
import { productRoutes } from './src/routes/product-routes';
import { userRoutes } from './src/routes/user-routes';
import { ENV_KEYS, envHandler } from './src/local-env';

dotenv.config();
export const env = new envHandler();
const app = express();
const PORT = env.get(ENV_KEYS.PORT) || 8000;
connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running in ${env.get(ENV_KEYS.NODE_ENV)} at https://localhost:${PORT}`);
});
