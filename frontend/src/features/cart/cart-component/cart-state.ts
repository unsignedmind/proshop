import { StateName } from '../../../state/state-names';
import { State } from '../../../state/utils';
import { CartEntry } from '../../../models/cart-dto';

export interface CartStateModel extends State {
	entries: Array<CartEntry>;
}

export const defaultCartState: CartStateModel = {
	name: StateName.CART_STATE,
	entries: [],
};
