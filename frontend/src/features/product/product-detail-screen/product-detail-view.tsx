import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import { isNil } from 'lodash';
import { getProduct } from './product-detail-controller';
import { useDispatch, useSelector } from 'react-redux';
import RatingView from '../../../widgets/rating-component/rating-view';
import MessageView from '../../../widgets/message/message-view';
import LoaderView from '../../../widgets/loader/loader-view';
import { RootState } from '../../../state/reducer';
import { StateName } from '../../../state/state-names';
import QTYSelector from '../../../widgets/qty-selector/qty-selector-view';

type TParams = {
	id: string;
};

const ProductDetailView: React.FC<RouteComponentProps<TParams>> = ({ match, history }: RouteComponentProps<TParams>) => {
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct(match?.params?.id));
	}, [dispatch, match]);

	const { loading, error, product } = useSelector((state: RootState) => state.appState[StateName.PRODUCT_DETAIL_STATE]);

	const handleQTYChange = (newQTY: number) => {
		setQty(newQTY);
	};

	const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
		e.preventDefault();
	};

	return loading ? (
		<LoaderView />
	) : error ? (
		<MessageView variant='message--error'>{error}</MessageView>
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
					<Card className='product-detail__buy-box'>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<Row>
									<Col md={5}>Price:</Col>
									<Col md={7}>{product?.price}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col md={5}>Status:</Col>
									<Col md={7}>{product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
								</Row>
							</ListGroupItem>
							{product.countInStock > 0 && (
								<ListGroupItem>
									<Row>
										<Col md={5} className='text-left'>
											Qty:
										</Col>
										<Col md={7} className='text-left'>
											<span>{qty}</span>
											<QTYSelector changeQty={handleQTYChange} qty={qty} stock={product.countInStock} />
										</Col>
									</Row>
								</ListGroupItem>
							)}
							<ListGroupItem>
								<Button className='btn-block' type='button' disabled={product?.countInStock === 0} onClick={addToCartHandler}>
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
