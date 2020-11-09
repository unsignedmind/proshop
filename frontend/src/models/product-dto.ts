import { ReviewDTO } from './review-dto';

// @todo add timestamp fields
export interface ProductDTO {
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
	reviews: Array<ReviewDTO>;
}
