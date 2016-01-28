import React, {PropTypes} from 'react';
import clickCoordinatesAsRatio from '../../../util/click-coordinates-as-ratio';


export default class Volume extends React.Component {

    /**
     * Get location of click in volume bar.
     */
    handleClick(e) {
        const volume = clickCoordinatesAsRatio(e, window, 'volume-bar');
        this.props.actionCreators.playback.PLAYBACK_SET_VOLUME(volume);
    }

    componentWillReceiveProps(newProps) {
        const newVolume = newProps.playback.volume;
        if (this.props.playback.volume !== newVolume) {
            document.getElementById('media').volume = newVolume;
        }
    }

    render() {
        const handleClick = this.handleClick.bind(this);
        const volume = this.props.playback.volume * 100 + '%';

        return (
            <div id="volume" className="col-xs-3 col-sm-2">
                <div id="volume-bar" onClick={handleClick} className="progress">
                        <div className="progress-bar progress-bar-info" style={{width: volume}}>
                            <span className="sr-only">{`Volume ${volume}`}</span>
                        </div>
                </div>
            </div>
        );
    }
}


Volume.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired
};
