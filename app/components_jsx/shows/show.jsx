import React from "react";
import {Link} from 'react-router';

export default class Show extends React.Component {

    /**
     * Remove non-alphunum and replace spaces with dashes.
     * @return String
    */
    urlify(string) {
        return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-").toLowerCase();
    }

    render() {
        return (<div className="show">
            <h2>
                <Link to={`/shows/${this.props.id}/${this.urlify(this.props.name)}`}>
                    {this.props.name}
                </Link>
            </h2>
            <p>{this.props.description}</p>
            <Link className="btn btn-primary btn-sm" to={`?s=${this.props.id}&e=latest`}>
                {'Play'}
            </Link>
        </div>);
    }
}
