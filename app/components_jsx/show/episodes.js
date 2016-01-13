import React from "react";
import Episode from "./episode";
import ajax from '../../../util/ajax';

export default class Episodes extends React.Component {
    constructor(props) {
        super(props);
        this.showId = props.showId;
        this.state = {episodes: []};
        this.getEpisodes();
    }

    getEpisodes() {
        ajax(`/api/v0/shows/${this.showId}/episodes`, (err, res, data) => {
            if (!err && res.statusCode == 200) {
                this.setState({episodes: data});
            } else {
                console.error('TODO: handle this err');
            }
        });
    }

    render() {
        const episode_list = this.state.episodes.map(episode => {
            return (
                <Episode
                    title={episode.title}
                    description={episode.description}
                    id={episode.id}
                    showId={this.showId}
                    media_url={episode.media_url}
                    pathname={this.props.pathname} />
            );
        });

        return (
            <div className="episodes">
                {episode_list}
            </div>
        );
    }
}
