import { ProductDTO } from '../../../models/product-dto';
import { Action, State, universalReducer } from '../../utils';

export interface ProductStateModel extends State {
	products: Array<ProductDTO>;
	loading: boolean;
	error: string;
}

export const defaultProductState: ProductStateModel = {
	products: [],
	loading: false,
	error: '',
};

export const productListReducer = (state: ProductStateModel = defaultProductState, action: Action) => universalReducer(state, action);
