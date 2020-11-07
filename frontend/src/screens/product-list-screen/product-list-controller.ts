import axios, { AxiosResponse } from 'axios';
import { isNil } from 'lodash';
import { ProductListActionTypes } from '../../state/reducers/product-list/product-list-actions';
import { ProductDTO } from '../../models/product-dto';
import { ProductStateModel } from '../../state/reducers/product-list/product-list-reducers';
import { genericAction } from '../../state/utils';

export const listProducts = () => async (dispatch: any) => {
	try {
		dispatch(
			new genericAction<ProductStateModel>(ProductListActionTypes.REQUEST_START, { loading: true })
		);

		const { data }: AxiosResponse<Array<ProductDTO>> = await axios.get('/api/products');
		dispatch(
			new genericAction<ProductStateModel>(ProductListActionTypes.REQUEST_SUCCESS, { loading: false, products: data })
		);
	} catch (error) {
		const payLoadError = !isNil(error.response) && !isNil(error.response.data.message) ? error.response.data.message : error.message;
		dispatch(
			new genericAction<ProductStateModel>(ProductListActionTypes.REQUEST_FAIL, { loading: false, error: payLoadError })
		);
	}
};
