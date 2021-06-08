import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProductPage = (props) => {
  console.log(props);
  const productId = props.match.params.id;
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.session);
  console.log(product, user);

  useEffect(() => dispatch(getProduct(productId)), [dispatch]);

  const minusCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const plusCount = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    console.log(productId);
  };

  return (
    <div>
      <h2>Product Page</h2>
      {product && (
        <Container>
          <Row>
            <Col>
              <Image src={product.image} rounded />
            </Col>
            <Col>
              <div>
                <h3>{product.title}</h3>
                <div>{product.category}</div>
                <div>{product.flavor}</div>
                <div>{product.description}</div>
                <div>
                  <Button variant="light" onClick={minusCount}>
                    -
                  </Button>
                  <span>{count}</span>
                  <Button variant="light" onClick={plusCount}>
                    +
                  </Button>
                </div>
                <Button variant="success" onClick={addToCart}>
                  Add to Cart
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ProductPage;
