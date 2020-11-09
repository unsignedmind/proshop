import { ProductDTO } from '../../models/product-dto';
import { State } from '../../state/utils';
import { StateName } from '../../state/state-names';

export interface ProductDetailStateModel extends State {
	product: ProductDTO;
	loading: boolean;
	error: string;
}

export const defaultProductDetailState: ProductDetailStateModel = {
	name: StateName.PRODUCT_DETAIL_STATE,
	product: {
		_id: '',
		name: '',
		image: '',
		description: '',
		brand: '',
		category: '',
		price: 0.0,
		countInStock: 0,
		rating: 0,
		numReviews: 0,
		reviews: [],
	},
	loading: false,
	error: '',
};
