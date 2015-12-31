import React from 'react';
import {Link} from 'react-router';

export default class Player extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            episode: {
                id: undefined,
                show_id: undefined,
                title: 'Better Podcast App',
                description: undefined
            }
        };
        this.getEpisode();
    }

    getEpisode() {
        const showId = this.props.showId;
        const episodeId = this.props.episodeId;

        if (showId && episodeId) {
            $.get(`/api/v0/shows/${showId}/episodes/${episodeId}`, res => {
                this.setState({episode: res});
            });
        }
    }

    render() {
        return (
            <div className="player">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            {this.state.episode.title}
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
