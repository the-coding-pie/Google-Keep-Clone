import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from "./containers/layouts/DefaultLayout";
import Modal from "./containers/Modal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import { RootState } from "./store/reducers";

const App = () => {
  const modal = useSelector((state: RootState) => state.modal);

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

      {/* modal */}
      {modal.modalType !== null && <Modal {...modal} />}
    </div>
  );
};

export default App;
