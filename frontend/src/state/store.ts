import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer, defaultAppState, RootState } from './reducer';
import { StateName } from './state-names';
import { isNil } from 'lodash';
import { defaultCartState } from '../features/cart/cart-component/cart-state';

const reducer = combineReducers({ appState: appReducer });
const middleware = [thunk];
const initialState = {};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
