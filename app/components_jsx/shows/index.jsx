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
        const showList = this.state.shows.map(show => {
            return <Show {...show}/>;
        });

        return (
            <div className="shows">
                <div className="show row">
                    {showList}
                </div>
            </div>
        );
    }
}
