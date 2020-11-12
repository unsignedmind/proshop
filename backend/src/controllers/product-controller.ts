import asyncHandler from 'express-async-handler';
import Product from '../models/product';
import { isNil } from 'lodash';

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access public
 */
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

/**
 * @description Fetch one product
 * @route GET /api/products/:id
 * @access public
 */
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!isNil(product)) {
		res.json(product);
	} else {
		res.status(404);
		new Error('Product not found');
	}
});
