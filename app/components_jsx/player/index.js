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

    getEpisode(showId, episodeId) {
        if (showId && episodeId) {
            this.props.actionCreators.playback.PLAYBACK_FETCH();
            ajax(`/api/v0/shows/${showId}/episodes/${episodeId}`, (err, res, data) => {
                if (!err && res.statusCode == 200) {
                    this.props.actionCreators.playback.PLAYBACK_FETCH_SUCCESS(data);
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
