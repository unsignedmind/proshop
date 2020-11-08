import { Action, State, universalReducer } from './utils';
import { defaultProductState, ProductListStateModel } from '../screens/product-list-screen/product-list-state';
import { StateName } from './state-names';

export interface AppStateModel extends State {
	[StateName.PRODUCT_LIST_STATE]: ProductListStateModel;
}

export const defaultAppState: AppStateModel = {
	name: StateName.APP_STATE,
	[StateName.PRODUCT_LIST_STATE]: defaultProductState,
};

export const appReducer = (state: AppStateModel = defaultAppState, action: Action) => universalReducer(state, action);
