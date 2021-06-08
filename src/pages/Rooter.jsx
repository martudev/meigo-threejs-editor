import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import API from "./API";
import GettingStarted from "./Docs/GettingStarted";
import Docs from "./Docs/Index";
import Landing from "./Landing";
import Welcome from "./Welcome";

export default function Rooter() {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                <Welcome />
            </Route>
            <Route path="/docs" component={DocsRoute} />
            <Route exact path="/api">
                <API />
            </Route>
            <Route exact path="/landing">
                <Landing />
            </Route>
            </Switch>
        </Router>
    );
}

const DocsRoute = ({ match }) => (
    <>
        <Docs>
            <Route path={`${match.path}/getting-started`} component={GettingStartedRoute} />
        </Docs>
    </>
)

const GettingStartedRoute = ({ match }) => (
    <>
        <GettingStarted />
    </>
)