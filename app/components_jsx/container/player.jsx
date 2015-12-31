import React from 'react';
import {Link} from 'react-router';

export default class Player extends React.Component {
    render() {
        return (
            <div className="player">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            {this.props.title}
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
