import axios, { AxiosResponse } from 'axios';
import { isNil } from 'lodash';
import { ProductListActionTypes } from './product-list-actions';
import { ProductDTO } from '../../../models/product-dto';
import { ProductListStateModel } from './product-list-state';
import { genericAction } from '../../../state/utils';
import { StateName } from '../../../state/state-names';

export const listProducts = () => async (dispatch: any) => {
	try {
		dispatch(
			new genericAction<ProductListStateModel>(ProductListActionTypes.REQUEST_START, { loading: true }, StateName.PRODUCT_LIST_STATE)
		);

		const { data }: AxiosResponse<Array<ProductDTO>> = await axios.get('/api/products');
		dispatch(
			new genericAction<ProductListStateModel>(
				ProductListActionTypes.REQUEST_SUCCESS,
				{ loading: false, products: data },
				StateName.PRODUCT_LIST_STATE
			)
		);
	} catch (error) {
		const payLoadError = !isNil(error.response) && !isNil(error.response.data.message) ? error.response.data.message : error.message;
		dispatch(
			new genericAction<ProductListStateModel>(
				ProductListActionTypes.REQUEST_FAIL,
				{ loading: false, error: payLoadError },
				StateName.PRODUCT_LIST_STATE
			)
		);
	}
};
