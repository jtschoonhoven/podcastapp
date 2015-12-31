import React from "react";
import {Link} from 'react-router';

export default class Episode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="episode">
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
                <Link className="btn btn-primary btn-sm"
                    to={this.props.pathname}
                    query={{s: this.props.showId, e: this.props.id}}>
                    {'Play'}
                </Link>
            </div>);
    }
}

// <audio src={'/media/gabfest.mp3'} controls>
//     {'Media not supported by browser'}
// </audio>
