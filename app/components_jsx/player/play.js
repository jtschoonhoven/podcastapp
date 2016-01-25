import React, {PropTypes} from 'react';

export default class Play extends React.Component {
    componentWillReceiveProps(newProps) {
        const playState = newProps.playing ? 'pause' : 'play';
        document.getElementById('media')[playState]();
    }

    handleClick() {
        this.props.actionCreators.playback.PLAYBACK_TOGGLE();
    }

    render() {
        const handleClick = this.handleClick.bind(this);
        const glyphClass = this.props.playback.playing ? 'pause' : 'play';

        return (
            <div className="buttons col-xs-1">
                <button onClick={handleClick} type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    <span className={`glyphicon glyphicon-${glyphClass}`} aria-hidden="true"></span>
                </button>
            </div>
        );
    }
}


Play.propTypes = {
    actionCreators: PropTypes.object,
    playback: PropTypes.object
};
