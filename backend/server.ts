import express from 'express';
import products from './src/data/products';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

app.get('/api/products', (req, res) => {
	res.send(products);
});

app.get('/api/product/:id', (req, res) => {
	const product = products.find((product) => product._id === req.params.id);
	res.send(product);
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${PORT}`);
});
