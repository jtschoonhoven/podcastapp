import React from 'react';
import {Link} from 'react-router';
import Player from './player';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            return child;
        });

        return (
            <div className="container">
                {children}
                <Player />
            </div>
        );
    }
}
