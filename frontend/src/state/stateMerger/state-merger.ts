import { State } from '../utils';
import { ProductStateModel } from '../reducers/product-list/product-list-reducers';

export interface IStateMerger {
	merge(state: any, payload: any): State;
}

/**
 * Default merger. Do not edit !
 */
export class StateMerger implements IStateMerger {
	merge(state: State, payload: Partial<State>): Partial<State> {
		return { ...state, ...payload };
	}
}

/**
 * Add custom merger below
 */
export class ProductListRequestStartStateMerger extends StateMerger {
	merge(state: ProductStateModel, payload: Partial<ProductStateModel>): Partial<ProductStateModel> {
		return { ...state, products: payload.products, error: 'State merger says hello :)' };
	}
}
