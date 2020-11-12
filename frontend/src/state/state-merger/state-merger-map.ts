import { ProductListActionTypes } from '../../features/product/product-list-screen/product-list-actions';
import { ProductListRequestStartStateMerger, DefaultStateMerger, AddToCartStateMerger, RemoveFromCartStateMerger } from './state-merger';
import { CartActionTypes } from '../../features/cart/cart-component/cart-actions';

/**
 * The action class has a flag named useCustomStateMerger. If true then the reduce function of that action
 * gets a stateMerger from the map below and runs the merge function.
 */

export const DEFAULT_STATE_MERGER_KEY = 'DEFAULT';

export const customerStateMergerMap: Map<string, DefaultStateMerger> = new Map([
	[DEFAULT_STATE_MERGER_KEY, new DefaultStateMerger()],
	[ProductListActionTypes.REQUEST_START, new ProductListRequestStartStateMerger()],
	[CartActionTypes.ADD_TO_CART, new AddToCartStateMerger()],
	[CartActionTypes.REMOVE_FROM_CART, new RemoveFromCartStateMerger()],
]);
