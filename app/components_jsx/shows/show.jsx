import React from "react";
import {Link} from 'react-router';

export default class Show extends React.Component {

    /**
     * Remove non-alphunum and replace spaces with dashes.
     * @return String
    */
    urlify(string) {
        return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-").toLowerCase();
    }

    render() {
        const showUrl = `/shows/${this.props.id}/${this.urlify(this.props.name)}`;
        return (
            <div className="col-xs-12 col-sm-4 col-md-3">
                <div className="thumbnail">
                    <link to={showUrl}>
                        <img src={this.props.image_url} alt="this.props.name" />
                    </link>
                    <div className="caption">
                        <h3>
                            <Link to={showUrl}>{this.props.name}</Link>
                        </h3>
                        <p>{this.props.description}</p>
                            <div className="btn-group" role="group">
                                <Link className="btn btn-primary btn-sm" to={`?s=${this.props.id}&e=latest`}>
                                    {'Play latest'}
                                </Link>
                                <Link className="btn btn-default btn-sm" to={showUrl}>
                                    {'Brows episodes'}
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
