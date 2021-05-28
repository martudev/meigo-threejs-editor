import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Editor from "./Editor";
import Landing from "./Landing";
import Welcome from "./Welcome";

export default function Rooter() {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/welcome">
                <Welcome />
            </Route>
            <Route exact path="/editor">
                <Editor />
            </Route>
            </Switch>
        </Router>
    );
}