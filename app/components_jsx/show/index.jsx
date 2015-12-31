import React from "react";
import {Link} from 'react-router';
import Episodes from "./episodes";

export default class Show extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.params.id;
        this.state = {};
    }

    componentDidMount() {
        $.get(`/api/v0/shows/${this.id}`, showInfo => {
            this.setState(showInfo);
        });
    }

    render() {
        return (
            <div className="show">
                <p><Link to={'/'}>{'<< Back to shows'}</Link></p>
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
                <hr />
                <Episodes
                    showId={this.id}
                    pathname={this.props.location.pathname} />
            </div>
        );
    }
}
