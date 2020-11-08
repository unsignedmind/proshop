import { ProductListActionTypes } from '../../screens/product-list-screen/product-list-actions';
import { ProductListRequestStartStateMerger, DefaultStateMerger } from './state-merger';

/**
 * The action class has a flag named useCustomStateMerger. If true then the reduce function of that action
 * gets a stateMerger from the map below and runs the merge function.
 */

export const DEFAULT_STATE_MERGER_KEY = 'DEFAULT';

export const customerStateMergerMap: Map<string, DefaultStateMerger> = new Map([
	[DEFAULT_STATE_MERGER_KEY, new DefaultStateMerger()],
	[ProductListActionTypes.REQUEST_START, new ProductListRequestStartStateMerger()],
]);
