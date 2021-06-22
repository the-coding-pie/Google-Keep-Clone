import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from "./containers/layouts/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div className="relative">
      <Router>
        <Switch>
          {/* /login */}
          <Route exact path="/login">
            <Login />
          </Route>
          {/* /register */}
          <Route exact path="/register">
            <Register />
          </Route>

          <PrivateRoute path="*">
            <DefaultLayout />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
