import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import UpdateProduct from "./UpdateProduct";
import { Image } from "cloudinary-react";
import { Container, Row, Col, Button } from "react-bootstrap";
import config from "../../config/config";

const ProductPage = (props) => {
  console.log(props);
  const productId = props.match.params.id;
  const [count, setCount] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.session.user);
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

  const addItemToCart = () => {
    const userId = user.id;
    console.log(userId, productId, count);
    // dispatch(addToCart(userId, productId));
  };

  return (
    <div>
      <h2>Product Page</h2>
      {user.isAdmin && (
        <Button onClick={() => history.push(`/products/${productId}/update`)}>
          Update Product
        </Button>
      )}
      {product && (
        <Container>
          <Row>
            <Col>
              {product.images && (
                <Image
                  key={product._id}
                  cloudName={config.cloudName}
                  publicId={product.images}
                  width="300"
                  crop="scale"
                />
              )}
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
                <Button variant="success" onClick={addItemToCart}>
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
