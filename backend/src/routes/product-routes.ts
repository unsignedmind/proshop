import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product';
import { isNil } from 'lodash';

const router = express.Router();

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access public
 */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.send(products);
	})
);

/**
 * @description Fetch one product
 * @route GET /api/products/:id
 * @access public
 */
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (!isNil(product)) {
			res.send(product);
		} else {
			res.status(404);
			new Error('Product not found');
		}
	})
);

export default router;
