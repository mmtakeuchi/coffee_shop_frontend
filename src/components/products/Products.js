import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "./Product";
import { CardDeck } from "react-bootstrap";

class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  renderProducts = () => {
    return (
      this.props.products &&
      this.props.products.map((product, i) => {
        return (
          <div key={i}>
            <Product product={product} />
          </div>
        );
      })
    );
  };

  render() {
    return (
      <div>
        <h2>Products Page</h2>
        <CardDeck>{this.renderProducts()}</CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
