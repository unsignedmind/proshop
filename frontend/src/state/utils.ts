import { customerStateMergerMap, DEFAULT_STATE_MERGER_KEY } from './stateMerger/state-merger-map';
import { isNil } from 'lodash';

export interface State {}

/**
 * type | name of action type and identifier for corresponding stateMerger
 * useCustomStateMerger | use self written merge logic
 * reducer | return object of the state type
 * constructor | action must be a flat json object
 */
export abstract class Action {
	public readonly type: string | undefined;
	public useCustomStateMerger?: boolean | undefined;
	protected constructor() {
		return Object.assign({}, this);
	}
	abstract reducer(state: State, stateMergerKey?: string): State;
}

/**
 * reducer | gets the stateMerger and runs it
 */
export class genericAction<M> extends Action {
	public reducer = (state: M, stateMergerKey: string) => {
		const stateMerger = customerStateMergerMap.get(stateMergerKey);
		if (!isNil(stateMerger)) {
			return stateMerger.merge(state, this.payload);
		} else {
			console.error(
				`ERROR: useCustomStateMerger was set to true for ${stateMergerKey} but no StateMerger was created. Please add it to customerStateMergerMap`
			);
			return state;
		}
	};

	/**
	 *
	 * @param type Name of the action. Is also Id for customStateMerges
	 * @param payload changed data
	 * @param useCustomStateMerger (optional) If true then a custom merger will be called by the reducer
	 */
	constructor(public readonly type: string | undefined, public payload: Partial<M>, public useCustomStateMerger?: boolean) {
		super();
	}
}

/**
 *
 * @param state current state
 * @param action dispatched action as flat js object
 */
export function universalReducer(state: State, action: Action) {
	const stateMergerKey = !isNil(action.useCustomStateMerger)
		? !isNil(action.type)
			? action.type
			: DEFAULT_STATE_MERGER_KEY
		: DEFAULT_STATE_MERGER_KEY;
	return action.reducer ? action.reducer(state, stateMergerKey) : state;
}
