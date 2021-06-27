import { Route, Switch } from "react-router";
import Error404 from "../../pages/Error404";
import Home from "../../pages/Home";
import Navbar from "../../containers/Navbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import SearchPage from "../../pages/SearchPage";
import About from "../../pages/About";

const DefaultLayout = () => {
  const { show } = useSelector((state: RootState) => state.sidebar);

  return (
    <div>
      <Navbar />

      <main className="w-full h-full">
        {/* sidebar */}
        {show && <Sidebar />}

        <div
          className={`body mt-14 ${show === true ? "ml-52" : "ml-0"} px-4 py-8`}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />

            <Route exact path="/label/:label" component={Home} />

            <Route exact path="/search/:search?" component={SearchPage} />

            {/* 404 Page */}
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
