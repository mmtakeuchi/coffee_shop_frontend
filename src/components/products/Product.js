import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product._id}`}>
        <Card>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>Flavor: {product.flavor}</Card.Text>
            <Card.Text>Price: {product.price}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{product.price}</small>
          </Card.Footer>
        </Card>
      </Link>
    </div>
  );
};

export default Product;
