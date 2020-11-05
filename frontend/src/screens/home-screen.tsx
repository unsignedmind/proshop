import { Col, Row } from 'react-bootstrap';
import { ProductDTO } from '../models/product-dto';
import React, { useEffect, useState } from 'react';
import ProductComponent from '../components/product-component/product-component';
import axios from 'axios';
import { isNil } from 'lodash';

const HomeScreen = () => {
	const [products, setProducts] = useState<Array<ProductDTO> | undefined>(undefined);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');
			setProducts(data);
		};
		fetchProducts();
	}, []);

	return !isNil(products) ? (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product: ProductDTO) => (
					<Col sm={12} md={6} lg={4} key={product?._id}>
						<ProductComponent product={product} />
					</Col>
				))}
			</Row>
		</>
	) : (
		<></>
	);
};
export default HomeScreen;
