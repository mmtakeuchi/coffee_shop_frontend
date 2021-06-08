import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  console.log(product);
  return (
    <div>
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
    </div>
  );
};

export default Product;
