import "./App.css";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./utils/routeUtil";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
