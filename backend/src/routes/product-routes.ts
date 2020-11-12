import express from 'express';
import { getProductById, getProducts } from '../controllers/product-controller';

export const productRoutes = express.Router();

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProductById);
