import { ProductDTO } from '../../models/product-dto';
import { State } from '../../state/utils';
import { StateName } from '../../state/state-names';

export interface ProductListStateModel extends State {
	products: Array<ProductDTO>;
	loading: boolean;
	error: string;
}

export const defaultProductListState: ProductListStateModel = {
	name: StateName.PRODUCT_LIST_STATE,
	products: [],
	loading: false,
	error: '',
};
