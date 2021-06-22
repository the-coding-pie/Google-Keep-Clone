import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  const auth = true;

  // if authenticated allow them
  if (auth) {
    return <Route {...rest}>{children}</Route>;
  }
  // else redirect them
  return <Redirect to="/login" />;
};

export default PrivateRoute;
