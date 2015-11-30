import React from "react";
import {Link} from 'react-router';

export default class ListItem extends React.Component {
    render() {
        return (<div>
            <h1>{'ABC LIST ITEM'}</h1>
            <Link to={'/'}>{'link'}</Link>
        </div>);
    }
}
