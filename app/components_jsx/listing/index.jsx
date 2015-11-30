import React from "react";
import {Link} from 'react-router';
import ListItem from "./list_item";

export default class Listing extends React.Component {
    render() {
        return (<div>
            <h1>{'XYZ LISTING'}</h1>
            <Link to={'/a'}>{'link A'}</Link>
        </div>);
    }
}

export {ListItem};
