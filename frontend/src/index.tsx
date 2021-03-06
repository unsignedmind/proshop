import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app-component';
import { unregister } from './serviceWorker';
import { Provider } from 'react-redux';
import store from './state/store';
import './index.scss';
import './bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppComponent />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
