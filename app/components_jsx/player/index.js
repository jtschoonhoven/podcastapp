import React from 'react';
import {Link} from 'react-router';
import Play from './play';
import Info from './info';
import Progress from './progress';
import Volume from './volume';

export default class Player extends React.Component {
    componentDidMount() {
        // const media = {
        //     playing: false,
        //     play: () => document.getElementById('media').play(),
        //     pause: () => document.getElementById('media').pause()
        // };
        // this.setState({media: media});
    }

    render() {
        return (
            <div className="player">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <audio id="media" style={{display: "none"}} controls autoPlay src={`/api/v0/media/${this.props.episodeId}`} />
                        <Play {...this.props} />
                        <Info {...this.props} />
                        <Progress {...this.props} />
                        <Volume {...this.props} />
                    </div>
                </nav>
            </div>
        );
    }
}
