import React from 'react';
import { connect } from 'react-redux';
import Player from '../player';
import Navbar from './navbar';
import { getActionCreators } from '../../store';
import ajax from '../../../util/ajax';


class Container extends React.Component {

    componentDidMount() {
        const showId = this.props.location.query.s;
        const episodeId = this.props.location.query.e;
        // this.props.dispatch({type: 'PLAYBACK_TOGGLE'});
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
                <Player {...this.props.playback} {...this.props.actionCreators.playback} />
                <div className="row pad"></div>
            </div>
        );
    }
}


Container.propTypes = {
    // route: React.PropTypes.object.isRequired,
    // children: React.PropTypes.arrayOf(React.PropTypes.element)
};


const selector = state => state;
const actionCreators = getActionCreators;
export default connect(selector, actionCreators)(Container);


