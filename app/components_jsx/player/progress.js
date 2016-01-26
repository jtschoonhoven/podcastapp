import React, {PropTypes} from 'react';

export default class Progress extends React.Component {
    handleClick(e) {
        /**
         * Get location of click in progress bar as a percent.
         */
        let x = 0;
        e = e || window.event;
        x = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;

        const {left, right} = document.getElementById('progress').getBoundingClientRect();
        const width = right - left;
        const offset = x - left;
        const percent = offset / width * 100;
        this.props.actionCreators.playback.PLAYBACK_SET_PROGRESS(percent);
    }

    render() {
        const handleClick = this.handleClick.bind(this);
        const progressPct = this.props.playback.progress + '%';
        const bufferedPct = this.props.playback.buffered - this.props.playback.progress + '%';

        return (
            <div id="progress" onClick={handleClick} className="progress col-xs-8 col-sm-9">
                    <div className="progress-bar progress-bar-success" style={{width: progressPct}}>
                        <span className="sr-only">{`${progressPct} Complete (success)`}</span>
                    </div>
                    <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: bufferedPct}}>
                        <span className="sr-only">{`${bufferedPct} Complete (warning)`}</span>
                    </div>
            </div>
        );
    }
}


Progress.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired
};
