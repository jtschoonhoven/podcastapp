import React from 'react';

export default class Play extends React.Component {
    handleClick() {
        this.props.PLAYBACK_TOGGLE();
    }

    render() {
        const handleClick = this.handleClick.bind(this);
        const glyphClass = this.props.playing ? 'pause' : 'play';
        return (
            <div className="buttons">
                <button onClick={handleClick} type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    <span className={`glyphicon glyphicon-${glyphClass}`} aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}
