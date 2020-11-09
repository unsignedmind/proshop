import axios, { AxiosResponse } from 'axios';
import { isNil } from 'lodash';
import { ProductDTO } from '../../models/product-dto';
import { genericAction } from '../../state/utils';
import { StateName } from '../../state/state-names';
import { ProductDetailStateModel } from './product-detail-state';
import { ProductDetailActionTypes } from './product-detail-actions';

export const getProduct = (id: string) => async (dispatch: any) => {
	try {
		dispatch(
			new genericAction<ProductDetailStateModel>(ProductDetailActionTypes.REQUEST_START, { loading: true }, StateName.PRODUCT_DETAIL_STATE)
		);

		const { data }: AxiosResponse<ProductDTO> = await axios.get(`/api/products/${id}`);
		dispatch(
			new genericAction<ProductDetailStateModel>(
				ProductDetailActionTypes.REQUEST_SUCCESS,
				{ loading: false, product: data },
				StateName.PRODUCT_DETAIL_STATE
			)
		);
	} catch (error) {
		const payLoadError = !isNil(error.response) && !isNil(error.response.data.message) ? error.response.data.message : error.message;
		dispatch(
			new genericAction<ProductDetailStateModel>(
				ProductDetailActionTypes.REQUEST_FAIL,
				{ loading: false, error: payLoadError },
				StateName.PRODUCT_DETAIL_STATE
			)
		);
	}
};
