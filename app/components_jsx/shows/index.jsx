import React from "react";
import {Link} from 'react-router';
import Show from "./show";

export default class Shows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shows: []};
    }

    componentDidMount() {
        $.get('/api/v0/shows', function(res) {
            this.setState({shows: res});
        }.bind(this));
    }

    render() {
        const showNodes = this.state.shows.map(show => {
            return <Show name={show.name} description={show.description} id={show.id} />;
        });

        return (
            <div className="shows">
                <h1>{'Shows'}</h1>
                <hr />
                {showNodes}
            </div>
        );
    }
}
