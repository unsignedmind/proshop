import { Col, Row } from 'react-bootstrap';
import { ProductDTO } from '../../../models/product-dto';
import React, { useEffect } from 'react';
import ProductView from './product-component/product-view';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './product-list-controller';
import { RootState } from '../../../state/reducer';
import LoaderView from '../../../widgets/loader/loader-view';
import MessageView from '../../../widgets/message/message-view';
import { StateName } from '../../../state/state-names';

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
				<MessageView variant='message--error'>{error}</MessageView>
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
