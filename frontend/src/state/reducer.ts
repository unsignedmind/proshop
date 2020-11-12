import { Action, State, universalReducer } from './utils';
import { defaultProductListState, ProductListStateModel } from '../features/product/product-list-screen/product-list-state';
import { StateName } from './state-names';
import { CartStateModel, defaultCartState } from '../features/cart/cart-component/cart-state';
import { defaultProductDetailState, ProductDetailStateModel } from '../features/product/product-detail-screen/product-detail-state';
import { isNil } from 'lodash';

const getCartEntriesFromStorage = (storageKey: string) => {
	const fromStorage = localStorage.getItem(storageKey);
	return !isNil(fromStorage) ? JSON.parse(fromStorage) : [];
};

export interface RootState {
	[StateName.APP_STATE]: AppStateModel;
}

export interface AppStateModel extends State {
	[StateName.PRODUCT_LIST_STATE]: ProductListStateModel;
	[StateName.PRODUCT_DETAIL_STATE]: ProductDetailStateModel;
	[StateName.CART_STATE]: CartStateModel;
}

export const defaultAppState: AppStateModel = {
	name: StateName.APP_STATE,
	[StateName.PRODUCT_LIST_STATE]: defaultProductListState,
	[StateName.PRODUCT_DETAIL_STATE]: defaultProductDetailState,
	[StateName.CART_STATE]: { ...defaultCartState, entries: getCartEntriesFromStorage('cartEntries') },
};

export const appReducer = (state: AppStateModel = defaultAppState, action: Action) => universalReducer(state, action);
