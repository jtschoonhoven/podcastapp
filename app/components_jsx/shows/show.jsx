import React from "react";
import {Link} from 'react-router';

export default class Show extends React.Component {
    render() {
        return (<div className="show">
            <h2>{this.props.name}</h2>
            <p>{this.props.description}</p>
            <Link to={'/show/' + this.props.id}>{'link'}</Link>
        </div>);
    }
}
