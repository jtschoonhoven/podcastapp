import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from '../player';
import Navbar from './navbar';
import { getActionCreators } from '../../store';
import ajax from '../../../util/ajax';


class Container extends React.Component {

    // getEpisode(showId, episodeId) {
    //     if (showId && episodeId) {
    //         ajax(`/api/v0/shows/${showId}/episodes/${episodeId}`, (err, res, data) => {
    //             if (!err && res.statusCode == 200) {
    //                 this.setState({episode: data});
    //             } else {
    //                 console.error('TODO: handle this err');
    //             }
    //         });
    //     }
    // }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, this.props);
        });

        return (
            <div className="wrapper">
                <Navbar />
                <div className="container-fluid">
                    {childrenWithProps}
                </div>
                <Player {...this.props.playback} {...this.props.actionCreators.playback} />
                <div className="row pad"></div>
            </div>
        );
    }
}


Container.propTypes = {
    actionCreators: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    playback: PropTypes.object.isRequired
};


// Inject state into component.
const selector = state => state;
const actionCreators = getActionCreators;
export default connect(selector, actionCreators)(Container);


