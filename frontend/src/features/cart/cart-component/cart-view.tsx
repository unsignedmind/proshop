import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'lodash';
import { addToCart, removeFromCart } from './cart-controller';
import qs from 'qs';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { RootState } from '../../../state/reducer';
import { StateName } from '../../../state/state-names';
import MessageView from '../../../widgets/message/message-view';
import QTYSelector from '../../../widgets/qty-selector/qty-selector-view';

type TParams = {
	id: string;
	qty: string;
};

const CartView: React.FC<RouteComponentProps<TParams>> = ({ match, location, history }: RouteComponentProps<TParams>) => {
	const productId = match.params.id;
	const quantity = location.search ? Number(qs.parse(location.search, { ignoreQueryPrefix: true }).qty) : 1;
	const dispatch = useDispatch();

	const { entries } = useSelector((state: RootState) => state[StateName.APP_STATE][StateName.CART_STATE]);

	useEffect(() => {
		if (!isNil(productId)) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	const handleQTYChange = (newQTY: number, productId?: string) => {
		if (!isNil(productId)) {
			dispatch(addToCart(productId, newQTY));
		}
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{entries.length === 0 ? (
					<MessageView>
						Your cart is empty <Link to='/'>Go Back</Link>
					</MessageView>
				) : (
					<ListGroup variant='flush'>
						{entries.map((entry) => (
							<ListGroup.Item key={entry.productId}>
								<Row>
									<Col md={2}>
										<Image src={entry.image} alt={entry.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${entry.productId}`}>{entry.name}</Link>
									</Col>
									<Col md={2}>${entry.price}</Col>
									<Col md={2}>
										<span>{entry.quantity}</span>
										<QTYSelector changeQty={handleQTYChange} productId={entry.productId} qty={entry.quantity} stock={entry.countInStock} />
									</Col>
									<Col md={2}>
										<Button type='button' variant='light' onClick={() => removeFromCartHandler(entry.productId)}>
											<i className='fas fa-trash' />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Subtotal ({entries.reduce((acc, entry) => acc + entry.quantity, 0)}) entries</h2>$
							{entries.reduce((acc, entry) => acc + entry.quantity * entry.price, 0).toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button type='button' className='btn-block' disabled={entries.length === 0} onClick={checkoutHandler}>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartView;
