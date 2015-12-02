import React from "react";
import {Link} from 'react-router';

export default class Show extends React.Component {
    render() {
        return (<div className="show">
            <h2>
                <Link to={`/shows/${this.props.id}`}>
                    {this.props.name}
                </Link>
            </h2>
            <p>{this.props.description}</p>
        </div>);
    }
}
