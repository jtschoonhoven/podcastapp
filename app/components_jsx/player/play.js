import React, {PropTypes} from 'react';

export default class Play extends React.Component {
    componentDidMount() {
        this.listenToPlayState();
    }

    /**
     * If playing/paused has changed in props, apply action to media element.
     */
    componentWillReceiveProps(newProps) {
        if (this.props.playback.playing != newProps.playback.playing) {
            const playState = newProps.playback.playing ? 'play' : 'pause';
            document.getElementById('media')[playState]();
        }
    }

    handleClick() {
        this.props.actionCreators.playback.PLAYBACK_TOGGLE();
    }

    playStateListener(playState) {
        const currentState = this.props.playback.playing ? 'playing' : 'paused';
        if (playState !== currentState) {
            this.props.actionCreators.playback.PLAYBACK_TOGGLE();
        }
    }

    /**
     * Listen for playing and pause events to get current play state.
     */
    listenToPlayState() {
        const media = document.getElementById('media');
        this.pauseListener = this.playStateListener.bind(this, 'paused');
        this.playListener = this.playStateListener.bind(this, 'playing');

        media.removeEventListener('playing', this.playListener);
        media.removeEventListener('pause', this.pauseListener);

        media.addEventListener('playing', this.playListener);
        media.addEventListener('pause', this.pauseListener);
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
