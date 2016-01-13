import React from 'react';
import { connect } from 'react-redux';
import Player from '../player';
import Navbar from './navbar';
import ajax from '../../../util/ajax';


class Container extends React.Component {

    componentDidMount() {
        const showId = this.props.location.query.s;
        const episodeId = this.props.location.query.e;
        // this.getEpisode(showId, episodeId);
    }

    getEpisode(showId, episodeId) {
        if (showId && episodeId) {
            ajax(`/api/v0/shows/${showId}/episodes/${episodeId}`, (err, res, data) => {
                if (!err && res.statusCode == 200) {
                    this.setState({episode: data});
                } else {
                    console.error('TODO: handle this err');
                }
            });
        }
    }

    render() {
        this.props.dispatch({type: 'PLAYBACK_TOGGLE'});
        if (typeof window !== 'undefined') {window.test = this;}
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
                    // showId={this.state.episode.show_id}
                    // episodeId={this.state.episode.id}
                    // title={this.state.episode.title}
                />
                <div className="row pad"></div>
            </div>
        );
    }
}


Container.propTypes = {
    // route: React.PropTypes.object.isRequired,
    // children: React.PropTypes.arrayOf(React.PropTypes.element)
};


export default connect()(Container);