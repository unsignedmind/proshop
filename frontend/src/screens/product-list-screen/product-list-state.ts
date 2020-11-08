import { ProductDTO } from '../../models/product-dto';
import { State } from '../../state/utils';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StateName } from '../../state/state-names';

export interface ProductListStateModel extends State {
	products: Maybe<Array<ProductDTO>>;
	loading: Maybe<boolean>;
	error: Maybe<string>;
}

export const defaultProductState: ProductListStateModel = {
	name: StateName.PRODUCT_LIST_STATE,
	products: [],
	loading: false,
	error: '',
};
