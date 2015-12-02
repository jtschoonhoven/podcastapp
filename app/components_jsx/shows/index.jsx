import React from "react";
import {Link} from 'react-router';
import Show from "./show";

export default class Shows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shows: []};
    }

    componentDidMount() {
        $.get('/api/v0/shows', res => {
            this.setState({shows: res});
        });
    }

    render() {
        const show_list = this.state.shows.map(show => {
            return <Show name={show.name} description={show.description} id={show.id} />;
        });

        return (
            <div className="shows">
                <h1>{'Shows'}</h1>
                <hr />
                {show_list}
            </div>
        );
    }
}
