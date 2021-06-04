import "./App.css";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./utils/routeUtil";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <div className="App">
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />

          <AuthRoute exact path="/products" component={Products} />
          <AuthRoute exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </div>
    </Container>
  );
}

export default App;
