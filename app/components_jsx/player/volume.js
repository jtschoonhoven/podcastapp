import React, {PropTypes} from 'react';
import debounce from 'lodash/function/debounce';


export default class Volume extends React.Component {
    handleChange() {
        const oldVol = this.props.playback.volume;
        const newVol = Number(document.getElementById('volume-slider').value);
        if (oldVol !== newVol) {
            this.props.actionCreators.playback.PLAYBACK_SET_VOLUME(newVol);
        }
    }

    render() {
        const handleChange = debounce(this.handleChange, 1000, {leading: true}).bind(this);
        const vol = this.props.playback.volume;
        return (
            <div id="volume" className="col-xs-3 col-sm-2">
                <form id="volume" className="volume navbar-form navbar-right" role="volume">
                      <input id="volume-slider" onChange={handleChange} type="range" value={vol} />
                </form>
            </div>
        );
    }
}


Volume.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired
};
