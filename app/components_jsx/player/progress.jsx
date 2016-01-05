import React from 'react';

export default class Progress extends React.Component {
    render() {
        return (
            <div className="progress">
                <div className="navbar-text">
                    <div className="buffered">
                      <span id="buffered-amount"></span>
                    </div>
                    <div className="progress">
                      <span id="progress-amount"></span>
                    </div>
                </div>
            </div>
        );
    }
}
