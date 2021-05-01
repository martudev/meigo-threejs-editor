import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Editor from "./Editor";

export default function Rooter() {
    return (
        <Router>
            <Switch>
            <Route path="*">
                <Editor />
            </Route>
            </Switch>
        </Router>
    );
}