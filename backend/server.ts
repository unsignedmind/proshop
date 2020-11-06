import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import productRoutes from './src/routes/product-routes';
import { errorHandler, notFound } from './src/middleware/error-middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${PORT}`);
});
