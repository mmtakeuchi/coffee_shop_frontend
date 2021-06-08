import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./utils/routeUtil";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/session/Login";
import Register from "./components/session/Register";
import Products from "./components/products/Products";
import NewProduct from "./components/products/NewProduct";
import ProductPage from "./components/products/ProductPage";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

          <Route exact path="/products" component={Products} />
          <ProtectedRoute path="/products/new" component={NewProduct} />
          <Route path="/products/:id" component={ProductPage} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
