import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Landing from "./Landing";
import Welcome from "./Welcome";

export default function Rooter() {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                <Welcome />
            </Route>
            <Route exact path="/landing">
                <Landing />
            </Route>
            </Switch>
        </Router>
    );
}