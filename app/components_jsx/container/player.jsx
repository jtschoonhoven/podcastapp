import React from 'react';
import {Link} from 'react-router';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: {
                playing: false,
                pause: () => {},
                play: () => {}
            }
        };
    }

    componentDidMount() {
        const media = {
            playing: false,
            play: () => document.getElementById('media').play(),
            pause: () => document.getElementById('media').pause()
        };
        this.setState({media: media});
    }

    render() {
        return (
            <div className="player">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <audio id="media" style={{display: "none"}} controls autoPlay src={`/api/v0/media/${this.props.episodeId}`} />
                        <button id="play" type="button" className="btn btn-link btn-lg navbar-btn navbar-left" onClick={this.state.media.play}>
                            <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                        </button>
                        <button id="pause" type="button" className="btn btn-link btn-lg navbar-btn navbar-left" onClick={this.state.media.pause}>
                            <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
                        </button>
                        <button id="skip" type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                        </button>
                        <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                            {this.props.title}
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
