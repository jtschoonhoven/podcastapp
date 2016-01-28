import React, {PropTypes} from 'react';
import debounce from 'lodash/function/debounce';
import clickCoordinatesAsRatio from '../../../util/click-coordinates-as-ratio';

export default class Progress extends React.Component {
    componentDidMount() {
        this.listenToMediaProgress();
    }

    /**
     * Get location of click in progress bar as a percent.
     */
    handleClick(e) {
        const progressRatio = clickCoordinatesAsRatio(e, window, 'progress-bar');
        const media = document.getElementById('media');
        media.currentTime = media.duration * progressRatio;
    }

    bufferedListener() {
        let buffered = 0;
        const media = document.getElementById('media');

        // Loop over buffered ranges to find first range that overlaps with current position.
        for (let i=media.buffered.length; i>0; i--) {
            const startOfRange = media.buffered.start(i - 1);
            if (startOfRange <= media.currentTime) {
                buffered = media.buffered.end(i - 1);
                break;
            }
        }

        if (media.duration) {
            const percent = buffered / media.duration * 100;
            debounce(this.props.actionCreators.playback.PLAYBACK_SET_BUFFERED)(percent);
        }
    }

    progressListener() {
        const media = document.getElementById('media');
        const duration =  media.duration;
        const percent = media.currentTime / duration * 100 || 0;
        debounce(this.props.actionCreators.playback.PLAYBACK_SET_PROGRESS)(percent);
    }

    /**
     * Unsubscribe then resubscribe to buffer and progress events from media.
     */
    listenToMediaProgress() {
        const media = document.getElementById('media');
        this.activeBufferedListener = this.bufferedListener.bind(this);
        this.activeProgressListener = this.progressListener.bind(this);

        media.removeEventListener('progress', this.activeBufferedListener);
        media.removeEventListener('timeupdate', this.activeProgressListener);

        media.addEventListener('progress', this.activeBufferedListener);
        media.addEventListener('timeupdate', this.activeProgressListener);
    }

    render() {
        const handleClick = this.handleClick.bind(this);
        const progressPct = this.props.playback.progress + '%';
        const bufferedPct = this.props.playback.buffered - this.props.playback.progress + '%';

        return (
            <div id="progress" className="col-xs-8 col-sm-9">
                <div id="progress-bar" className="progress" onClick={handleClick}>
                    <div className="progress-bar progress-bar-success" style={{width: progressPct}}>
                        <span className="sr-only">{`${progressPct} complete`}</span>
                    </div>
                    <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: bufferedPct}}>
                        <span className="sr-only">{`${bufferedPct} buffered`}</span>
                    </div>
                </div>
            </div>
        );
    }
}


Progress.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired
};
