import { Action, State, universalReducer } from './utils';
import { defaultProductListState, ProductListStateModel } from '../screens/product-list-screen/product-list-state';
import { StateName } from './state-names';
import { defaultProductDetailState, ProductDetailStateModel } from '../screens/product-detail-screen/product-detail-state';

export interface RootState {
	[StateName.APP_STATE]: AppStateModel;
}

export interface AppStateModel extends State {
	[StateName.PRODUCT_LIST_STATE]: ProductListStateModel;
	[StateName.PRODUCT_DETAIL_STATE]: ProductDetailStateModel;
}

export const defaultAppState: AppStateModel = {
	name: StateName.APP_STATE,
	[StateName.PRODUCT_LIST_STATE]: defaultProductListState,
	[StateName.PRODUCT_DETAIL_STATE]: defaultProductDetailState,
};

export const appReducer = (state: AppStateModel = defaultAppState, action: Action) => universalReducer(state, action);
