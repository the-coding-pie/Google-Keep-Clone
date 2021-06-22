import { Route, Switch } from "react-router-dom"
import Error404 from "../../pages/Error404"
import Home from "../../pages/Home"

const DefaultLayout = () => {
    return (
        <div>
         <Switch>
             <Route exact path="/">
                 <Home />
             </Route>

             {/* 404 Page */}
             <Route path="*">
                 <Error404 />
             </Route>
         </Switch>
        </div>
    )
}

export default DefaultLayout
