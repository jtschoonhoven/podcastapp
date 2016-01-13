import React from 'react';

export default class Volume extends React.Component {
    render() {
        return (
            <form id="volume" className="volume navbar-form navbar-left" role="volume">
                <p className="navbar-text">
                  <input type="range" min="0" max="1000" step="1" />
                </p>
            </form>
        );
    }
}
