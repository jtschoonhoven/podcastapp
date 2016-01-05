import React from 'react';

export default class Buttons extends React.Component {
    render() {
        return (
            <div className="buttons">
                <button id="play" type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </button>
                <button id="pause" type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
                </button>
                <button id="skip" type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}
