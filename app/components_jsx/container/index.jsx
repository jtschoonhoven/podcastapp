import React from 'react';
import {Link} from 'react-router';
import Player from './player';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const episodeId = this.props.location.query.e;
        const episodeTime = this.props.location.query.t;
        const children = React.Children.map(this.props.children, child => {
            return child;
        });

        return (
            <div className="wrapper">
                <div className="container">
                    {children}
                </div>
                <Player episodeId={episodeId} episodeTime={episodeTime} />
            </div>
        );
    }
}
