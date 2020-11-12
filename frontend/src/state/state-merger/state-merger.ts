import { State } from '../utils';
import { defaultProductListState, ProductListStateModel } from '../../features/product/product-list-screen/product-list-state';
import { AppStateModel } from '../reducer';
import { Maybe } from 'graphql/jsutils/Maybe';
import { isNil } from 'lodash';
import { StateName } from '../state-names';
import { CartStateModel } from '../../features/cart/cart-component/cart-state';
import { CartEntry } from '../../models/cart-dto';

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
				return {
					...state,
					[stateName]: {
						...[stateName],
						...payload,
					},
				};
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
				loading: payload.loading ? payload.loading : defaultProductListState.loading,
				error: 'State Merger working',
			},
		};
	}
}

export class AddToCartStateMerger extends DefaultStateMerger {
	merge(state: AppStateModel, payload: Partial<CartStateModel>): AppStateModel {
		let cartEntries: Array<CartEntry> = [];
		const newEntry = !isNil(payload.entries) ? payload.entries[0] : null;
		const productExistsInEntries = state[StateName.CART_STATE].entries.find((entry) => entry?.productId === newEntry?.productId);

		if (!isNil(productExistsInEntries)) {
			cartEntries = [
				...state[StateName.CART_STATE].entries.map((entry: CartEntry) => (entry?.productId === newEntry?.productId ? newEntry : entry)),
			];
		} else if (!isNil(newEntry)) {
			cartEntries = [...state[StateName.CART_STATE].entries, newEntry];
		} else {
			//@todo happens when action didn't deliver entry. error handler?
			cartEntries = [...state[StateName.CART_STATE].entries];
		}

		return {
			...state,
			[StateName.CART_STATE]: {
				...state[StateName.CART_STATE],
				entries: cartEntries,
			},
		};
	}
}

export class RemoveFromCartStateMerger extends DefaultStateMerger {
	merge(state: AppStateModel, payload: Partial<CartStateModel>): AppStateModel {
		const entryToRemove = !isNil(payload.entries) ? payload.entries[0] : null;

		return {
			...state,
			[StateName.CART_STATE]: {
				...state[StateName.CART_STATE],
				entries: [...state[StateName.CART_STATE].entries.filter((entry) => entry.productId !== entryToRemove?.productId)],
			},
		};
	}
}

/*
((state: AppStateModel, entries: Array<CartEntry>) => {
			const newEntry = entries[0];
			const productExistsInEntries = state[StateName.CART_STATE].entries.find((entry) => entry?.productId === newEntry?.productId);
			if (!isNil(productExistsInEntries)) {
				return [
					...state[StateName.CART_STATE].entries,
					...state[StateName.CART_STATE].entries.map((entry: CartEntry) =>
						entry?.productId === newEntry?.productId ? newEntry : entry
					),
				];
			} else {
				return [...state[StateName.CART_STATE].entries, newEntry];
			}
		})(state, !isNil(payload.entries) ? payload.entries : [])
* */
