import { ProductDTO } from '../../../models/product-dto';
import { State } from '../../../state/utils';
import { StateName } from '../../../state/state-names';
import { productDTOMock } from '../../../mocks/mocks';

export interface ProductDetailStateModel extends State {
	product: ProductDTO;
	loading: boolean;
	error: string;
}

export const defaultProductDetailState: ProductDetailStateModel = {
	name: StateName.PRODUCT_DETAIL_STATE,
	product: productDTOMock,
	loading: false,
	error: '',
};
