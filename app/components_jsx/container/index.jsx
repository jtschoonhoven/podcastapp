import React from 'react';
import Player from './player';

export default class Container extends React.Component {
    render() {
        const showId = this.props.location.query.s;
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
                <Player
                    showId={showId}
                    episodeId={episodeId}
                    episodeTime={episodeTime}
                />
            </div>
        );
    }
}
