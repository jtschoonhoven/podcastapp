import React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import routes from "./components/routes";
import { reducers } from './reducers';


const reducer = combineReducers(Object.assign({routing: routeReducer}, reducers));
const history = createBrowserHistory({queryKey: false});
const store = createStore(reducer);
syncReduxAndRouter(history, store);


class Router extends React.Component {
    render() {
        return routes(this.props.history);
    }
}

Router.propTypes = {
    history: React.PropTypes.object.isRequired
};


render(
    <Provider store={store}>
        <Router history={history} />
    </Provider>,
    document.getElementById('app')
);
