import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import Show from './show';
import ajax from '../../../util/ajax';

export default class Shows extends React.Component {
    componentDidMount() {
        this.props.actionCreators.shows.SHOWS_FETCH('/api/v0/shows');
        ajax('/api/v0/shows', (err, res, data) => {
            if (!err && res.statusCode == 200) {
                this.props.actionCreators.shows.SHOWS_FETCH_SUCCESS(data);
            } else {
                this.props.actionCreators.shows.SHOWS_FETCH_FAILURE(err);
            }
        });
    }

    render() {
        const showList = this.props.shows.collection.map(showProps => {
            return <Show {...showProps}/>;
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


Shows.propTypes = {
    actionCreators: PropTypes.object,
    shows: PropTypes.object
};
