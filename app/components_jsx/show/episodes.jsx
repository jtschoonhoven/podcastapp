import React from "react";
import Episode from "./episode";

export default class Episodes extends React.Component {
    constructor(props) {
        super(props);
        this.showId = props.showId;
        this.state = {episodes: []};
    }

    componentDidMount() {
        $.get(`/api/v0/shows/${this.showId}/episodes`, res => {
            this.setState({episodes: res});
        });
    }

    render() {
        const episode_list = this.state.episodes.map(episode => {
            return <Episode title={episode.title} description={episode.description} id={episode.id} />;
        });

        return (
            <div className="episodes">
                {episode_list}
            </div>
        );
    }
}
