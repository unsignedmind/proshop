import React from 'react';
import HeaderComponent from './main/header-component';
import FooterComponent from './main/footer-component';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductListView from './features/product/product-list-screen/product-list-view';
import './app-component.scss';
import CartView from './features/cart/cart-component/cart-view';
import ProductDetailView from './features/product/product-detail-screen/product-detail-view';

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
					<Route path='/cart/:id?' component={CartView} />
				</Container>
			</main>
			<FooterComponent />
		</Router>
	);
}

export default AppComponent;
