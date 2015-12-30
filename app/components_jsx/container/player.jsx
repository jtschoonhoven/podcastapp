import React from 'react';
import {Link} from 'react-router';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <button type="button" className="btn btn-default btn-lg navbar-btn">
                            <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-default btn-lg navbar-btn">
                            <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
