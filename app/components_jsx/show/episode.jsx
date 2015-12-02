import React from "react";
import {Link} from 'react-router';

export default class Episode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="episode">
                <h3>
                    <Link to={'/'}>{this.props.title}</Link>
                </h3>
                <p>{this.props.description}</p>
                <audio>
                    {'Media not supported by browser'}
                    <source src={this.props.media_url} type={'audio/mp3'} controls={'controls'} />
                </audio>
            </div>);
    }
}
