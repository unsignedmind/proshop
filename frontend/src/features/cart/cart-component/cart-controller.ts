import axios, { AxiosResponse } from 'axios';
import { isNil } from 'lodash';
import { genericAction } from '../../../state/utils';
import { CartActionTypes } from './cart-actions';
import { CartStateModel } from './cart-state';
import { ProductDTO } from '../../../models/product-dto';
import { StateName } from '../../../state/state-names';
import { cartEntryMock } from '../../../mocks/mocks';

export const getProduct = (id: string) => async (dispatch: any) => {
	try {
	} catch (error) {
		const payLoadError = !isNil(error.response) && !isNil(error.response.data.message) ? error.response.data.message : error.message;
	}
};

export const addToCart = (id: string, qty: number) => async (dispatch: any, getState: any) => {
	const { data }: AxiosResponse<ProductDTO> = await axios.get(`/api/products/${id}`);

	dispatch(
		new genericAction<CartStateModel>(
			CartActionTypes.ADD_TO_CART,
			{
				entries: [
					{
						productId: data._id,
						name: data.name,
						countInStock: data.countInStock,
						image: data.image,
						price: data.price,
						quantity: qty,
					},
				],
			},
			null,
			true
		)
	);

	localStorage.setItem('cartEntries', JSON.stringify(getState()[StateName.APP_STATE][StateName.CART_STATE].entries));
};

export const removeFromCart = (id: string) => (dispatch: any, getState: any) => {
	dispatch(
		new genericAction<CartStateModel>(CartActionTypes.REMOVE_FROM_CART, { entries: [{ ...cartEntryMock, productId: id }] }, null, true)
	);

	localStorage.setItem('cartEntries', JSON.stringify(getState()[StateName.APP_STATE][StateName.CART_STATE].entries));
};

/*

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(data));
};
* */
