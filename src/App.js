import "./App.css";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./utils/routeUtil";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />

        <AuthRoute exact path="/products" component={Products} />
      </Switch>
    </div>
  );
}

export default App;
