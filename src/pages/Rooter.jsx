import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Index from "./Index";

export default function Rooter() {
    return (
        <Router>
            <Switch>
            <Route path="*">
                <Index></Index>
            </Route>
            </Switch>
        </Router>
    );
}