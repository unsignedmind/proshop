import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import RatingView from '../../components/rating-component/rating-view';
import { isNil } from 'lodash';
import { getProduct } from './product-detail-controller';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducer';
import { StateName } from '../../state/state-names';
import LoaderView from '../../components/loader/loader-view';
import MessageView from '../../components/message/message-view';

type TParams = {
	id: string;
};

const ProductDetailView: React.FC<RouteComponentProps<TParams>> = ({ match }: RouteComponentProps<TParams>) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct(match?.params?.id));
	}, [dispatch, match]);

	const { loading, error, product } = useSelector((state: RootState) => state.appState[StateName.PRODUCT_DETAIL_STATE]);

	return loading ? (
		<LoaderView />
	) : error ? (
		<MessageView variant='message--error' message={error} />
	) : !isNil(product) ? (
		<>
			<Link to={'/'} className={'btn btn-light my-3'}>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image fluid src={product?.image} alt={product?.name} />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>{product?.name}</h3>
							<RatingView value={product?.rating} text={`${product?.numReviews} reviews`} />
						</ListGroupItem>
						<ListGroupItem>Price: ${product?.price}</ListGroupItem>
						<ListGroupItem>Description: ${product?.description}</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>{product?.price}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Status:</Col>
									<Col>{product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button className='btn-block' type='button' disabled={product?.countInStock === 0}>
									Add to Cart
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	) : (
		<></>
	);
};

export default ProductDetailView;
