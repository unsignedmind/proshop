import { Col, Row } from 'react-bootstrap';
import { ProductDTO } from '../../models/product-dto';
import React, { useEffect } from 'react';
import ProductView from '../../components/product-component/product-view';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './product-list-controller';
import { RootState } from '../../state/reducer';
import LoaderView from '../../components/loader/loader-view';
import MessageView from '../../components/message/message-view';
import { StateName } from '../../state/state-names';

const ProductListView: React.FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const productsList = useSelector((state: RootState) => state.appState[StateName.PRODUCT_LIST_STATE]);
	const { loading, error, products } = productsList;

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<LoaderView />
			) : error ? (
				<MessageView variant='message--error' message={error} />
			) : (
				<Row>
					{products?.map((product: ProductDTO) => (
						<Col sm={12} md={6} lg={4} key={product?._id}>
							<ProductView product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};
export default ProductListView;
