import React, {PropTypes} from 'react';
import Play from './play';
import Progress from './progress';
import Volume from './volume';
import ajax from '../../../util/ajax';

export default class Player extends React.Component {
    componentDidMount() {
        const query = this.props.location.query;
        this.getEpisode(query.s, query.e);
    }

    componentWillUpdate(newProps) {
        const oldQuery = this.props.location.query;
        const newQuery = newProps.location.query;
        if (newQuery.e && newQuery.e !== oldQuery.e) {
            this.getEpisode(newQuery.s, newQuery.e);
        }
    }

    bufferedListener() {
        const media = document.getElementById('media');
        const bufferedEnd = media.buffered.end(media.buffered.length - 1);
        const percent = bufferedEnd / media.duration * 100 || 0;
        this.props.actionCreators.playback.PLAYBACK_SET_BUFFERED(percent);
    }

    progressListener() {
        const media = document.getElementById('media');
        const duration =  media.duration;
        const percent = media.currentTime / duration * 100 || 0;
        this.props.actionCreators.playback.PLAYBACK_SET_PROGRESS(percent);
    }

    listenToMediaProgress() {
        const media = document.getElementById('media');
        media.removeEventListener('progress', this.bufferedListener.bind(this));
        media.removeEventListener('timeupdate', this.progressListener.bind(this));
        media.addEventListener('progress', this.bufferedListener.bind(this));
        media.addEventListener('timeupdate', this.progressListener.bind(this));
    }

    getEpisode(showId, episodeId) {
        if (showId && episodeId) {
            this.props.actionCreators.playback.PLAYBACK_FETCH();
            ajax(`/api/v0/shows/${showId}/episodes/${episodeId}`, (err, res, data) => {
                if (!err && res.statusCode == 200) {
                    this.props.actionCreators.playback.PLAYBACK_FETCH_SUCCESS(data);
                    this.listenToMediaProgress();
                } else {
                    this.props.actionCreators.playback.PLAYBACK_FETCH_FAILURE(err);
                }
            });
        }
    }

    render() {
        const episodeId = this.props.playback.episode.id;
        return (
            <div className="player">
                <audio id="media" style={{display: "none"}} controls autoPlay src={`/api/v0/media/${episodeId}`} />
                <nav className="navbar navbar-default">
                    <div className="container-fluid row">
                        <Play {...this.props} />
                        <Progress {...this.props} />
                        <Volume {...this.props} />
                    </div>
                </nav>
            </div>
        );
    }
}


Player.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    playback: PropTypes.object.isrequired
};
