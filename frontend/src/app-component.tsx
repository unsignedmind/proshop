import React from 'react';
import HeaderComponent from './components/header-component';
import FooterComponent from './components/footer-component';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductListView from './screens/product-list-screen/product-list-view';
import './app-component.scss';
import ProductDetailView from './screens/product-detail-screen/product-detail-view';

/**
 * Entrypoint
 * @constructor
 */
function AppComponent() {
	return (
		<Router>
			<HeaderComponent />
			<main className='app__page-indentation'>
				<Container>
					<Route path='/' component={ProductListView} exact />
					<Route path='/product/:id' component={ProductDetailView} />
				</Container>
			</main>
			<FooterComponent />
		</Router>
	);
}

export default AppComponent;
