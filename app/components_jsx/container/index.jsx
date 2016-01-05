import React from 'react';
import Player from '../player';
import Navbar from './navbar';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: {
                id: this.props.location.query.e,
                show_id: this.props.location.query.s
            }
        };
        this.getEpisode();
    }

    getEpisode(showId, episodeId) {
        if (showId && episodeId) {
            $.get(`/api/v0/shows/${showId}/episodes/${episodeId}`, res => {
                this.setState({episode: res});
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const showId = nextProps.location.query.s;
        const episodeId = nextProps.location.query.e;
        this.getEpisode(showId, episodeId);
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            return child;
        });

        return (
            <div className="wrapper">
                <Navbar />
                <div className="container-fluid">
                    {children}
                </div>
                <Player
                    showId={this.state.episode.show_id}
                    episodeId={this.state.episode.id}
                    title={this.state.episode.title}
                />
                <div className="row pad"></div>
            </div>
        );
    }
}
