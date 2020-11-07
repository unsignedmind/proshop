import { Col, Row } from 'react-bootstrap';
import { ProductDTO } from '../../models/product-dto';
import React, { useEffect } from 'react';
import ProductView from '../../components/product-component/product-view';
import { isNil } from 'lodash';
import { useDispatch } from 'react-redux';
import { listProducts } from './product-list-controller';

const ProductListView: React.FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const products: Array<any> = [];

	return !isNil(products) ? (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product: ProductDTO) => (
					<Col sm={12} md={6} lg={4} key={product?._id}>
						<ProductView product={product} />
					</Col>
				))}
			</Row>
		</>
	) : (
		<></>
	);
};
export default ProductListView;
