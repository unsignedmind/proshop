import React from 'react';
import './product-styles.scss';
import { Card } from 'react-bootstrap';
import { ProductDTO } from '../../models/product-dto';
import RatingView from '../rating-component/rating-view';
import { Link } from 'react-router-dom';

interface Props {
	product: ProductDTO;
}

const ProductView: React.FC<Props> = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product?._id}`}>
				<Card.Img src={product?.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product?._id}`}>
					<Card.Title as='div' className='product__title'>
						{product?.name}
					</Card.Title>
				</Link>
				<Card.Text as='div' className='product__rating'>
					<RatingView value={product?.rating} text={`${product?.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as='h3'>${product?.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ProductView;
