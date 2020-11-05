import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ProductDTO } from '../models/product-dto';
import { Row, Col, Image, ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import RatingComponent from '../components/rating-component/rating-component';
import { isNil } from 'lodash';
import axios from 'axios';

type TParams = {
	id: string;
};

const ProductScreen: React.FC<RouteComponentProps<TParams>> = ({ match }: RouteComponentProps<TParams>) => {
	const [product, setProduct] = useState<ProductDTO | undefined>(undefined);

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/product/${match.params?.id}`);
			setProduct(data);
		};
		fetchProduct();
	}, [match]);

	// let product: ProductDTO | undefined = products.find((product) => product?._id === match?.params?.id);

	return !isNil(product) ? (
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
							<RatingComponent value={product?.rating} text={`${product?.numReviews} reviews`} />
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

export default ProductScreen;
