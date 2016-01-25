import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Player from '../player';
import Navbar from './navbar';
import {getActionCreators} from '../../store';


class Container extends React.Component {
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
                <Player {...this.props} />
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


