import {render} from "react-dom";
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from "./components/routes";

render(
    routes(createBrowserHistory({queryKey: false})),
    document.getElementById('app')
);
