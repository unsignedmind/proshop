import { ProductListActionTypes } from '../reducers/product-list/product-list-actions';
import { ProductListRequestStartStateMerger, StateMerger } from './state-merger';

/**
 * The action class has a flag named useCustomStateMerger. If true then the reduce function of that action
 * gets a stateMerger from the map below and runs the merge function.
 */

export const DEFAULT_STATE_MERGER_KEY = 'DEFAULT';

export const customerStateMergerMap: Map<string, StateMerger> = new Map([
	[DEFAULT_STATE_MERGER_KEY, new StateMerger()],
	[ProductListActionTypes.REQUEST_START, new ProductListRequestStartStateMerger()],
]);
