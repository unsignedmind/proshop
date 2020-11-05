import { Col, Row } from 'react-bootstrap';
import { ProductDTO } from '../models/product-dto';
import React from 'react';
import products from '../products';
import ProductComponent from '../components/product-component/product-component';

const HomeScreen = () =>
  <>
    <h1>Latest Products</h1>
    <Row>
      {
        products.map((product: ProductDTO) =>
          <Col sm={12} md={6} lg={4} key={product?._id}>
            <ProductComponent product={product}/>
          </Col>,
        )
      }
    </Row>
  </>
  ;

export default HomeScreen;
