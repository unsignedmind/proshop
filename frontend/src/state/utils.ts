import { customerStateMergerMap, DEFAULT_STATE_MERGER_KEY } from './state-merger/state-merger-map';
import { isNil } from 'lodash';
import { AppStateModel } from './reducer';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StateName } from './state-names';

export interface State {
	readonly name: StateName;
}

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
	abstract reducer(state: State, stateMergerKey: string): AppStateModel;
}

/**
 * reducer | gets the stateMerger and runs it
 */
export class genericAction<M extends State> extends Action {
	public stateName: Maybe<StateName>;
	public reducer = (state: AppStateModel, stateMergerKey: string) => {
		const stateMerger = customerStateMergerMap.get(stateMergerKey);
		if (!isNil(stateMerger)) {
			return stateMerger.merge(state, this.payload, this.stateName);
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
	 * @param stateName is used to tell the default merger which state it should apply the payload to
	 * @param useCustomStateMerger (optional) If true then a custom merger will be called by the reducer
	 */
	constructor(
		public readonly type: string,
		public payload: Partial<M>,
		stateName?: Maybe<StateName>,
		public useCustomStateMerger?: boolean
	) {
		super();
		this.stateName = stateName;
	}
}

/**
 *
 * @param state current state
 * @param action dispatched action as flat js object
 */
export function universalReducer(state: AppStateModel, action: Action) {
	const stateMergerKey = !isNil(action.useCustomStateMerger)
		? !isNil(action.type)
			? action.type
			: DEFAULT_STATE_MERGER_KEY
		: DEFAULT_STATE_MERGER_KEY;
	return action.reducer ? action.reducer(state, stateMergerKey) : state;
}
