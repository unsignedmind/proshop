import { State } from '../utils';
import { ProductListStateModel } from '../../screens/product-list-screen/product-list-state';
import { AppStateModel } from '../reducer';
import { Maybe } from 'graphql/jsutils/Maybe';
import { isNil } from 'lodash';
import { StateName } from '../state-names';

export interface IStateMerger {
	merge(state: AppStateModel, payload: Partial<State>, stateName?: Maybe<StateName | undefined>): State;
}

/**
 * The default merger supports 2 level state model. This can easily be increased
 */
export class DefaultStateMerger implements IStateMerger {
	merge(state: AppStateModel, payload: Partial<AppStateModel>, stateName: Maybe<StateName>): any {
		if (!isNil(stateName)) {
			if (stateName === StateName.APP_STATE) {
				return { ...state, ...payload };
			} else {
				const newAppState: AppStateModel = { ...state };
				newAppState[stateName] = { ...newAppState[stateName], ...payload };
				return newAppState;
			}
		} else {
			console.error('stateName is null or undefined. Actions which use the default merger must have a defined stateName !');
		}
	}
}

/**
 * Add custom merger below
 */
export class ProductListRequestStartStateMerger extends DefaultStateMerger {
	merge(state: AppStateModel, payload: Partial<ProductListStateModel>): AppStateModel {
		return {
			...state,
			productListState: {
				...state.productListState,
				loading: payload.loading,
				error: 'State Merger working',
			},
		};
	}
}
