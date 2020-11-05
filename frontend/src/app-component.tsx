import React from 'react';
import HeaderComponent from './components/header-component';
import FooterComponent from './components/footer-component';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/home-screen';
import './app-component.scss'
import ProductScreen from './screens/product-screen';

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
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/product/:id" component={ProductScreen}/>
        </Container>
      </main>
      <FooterComponent />
    </Router>
  );
}

export default AppComponent;
