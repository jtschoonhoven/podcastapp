import React, {PropTypes} from "react";
import {Link} from 'react-router';

export default class Show extends React.Component {

    /**
     * Remove non-alphunum and replace spaces with dashes.
     * @return String
    */
    urlify(string) {
        return string.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-").toLowerCase();
    }

    /**
     * Limit string to n chars, breaking on last period.
     * If no period, break on space and end string in ellipsis.
     * @return string
    */
    limitTextLength(string, limit) {
        limit = limit || 140;
        if (typeof string !== 'string') {
            throw new Error("Type must be string.");
        }
        if (string.length <= limit) {
            return string;
        }
        let lastSpaceIndex = null;
        let lastPeriodIndex = null;
        for (let i=0; i<limit; i++) {
            if (string[i] === ' ') { lastSpaceIndex = i; }
            if (string[i] === '.') { lastPeriodIndex = i; }
        }
        if (lastPeriodIndex) {
            return string.slice(0, lastPeriodIndex + 1);
        }
        else if (lastSpaceIndex) {
            return string.slice(0, lastSpaceIndex) + '…';
        }
        else {
            return string.slice(0, limit - 1) + '…';
        }
    }

    render() {
        const showUrl = `/shows/${this.props.id}/${this.urlify(this.props.name)}`;

        return (
            <div id='featured-show' className="show col-xs-6 col-sm-3 col-md-3 col-lg-2 col-xl-1">
                <div className="thumbnail">
                    <link to={showUrl}>
                        <img src={this.props.image_url} alt="this.props.name" />
                    </link>

                    <div className="caption">
                        <h3>
                            <Link to={showUrl}>{this.props.name}</Link>
                        </h3>
                        <p>{this.limitTextLength(this.props.description)}</p>
                    </div>
                </div>
            </div>
        );
    }
}


Show.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
