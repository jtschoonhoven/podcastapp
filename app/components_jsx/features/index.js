import React, { PropTypes } from 'react';
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
            <div id="features">
                <div className="jumbotron">
                    <div className="container">
                        <h1>{'Hlelo, wlrod!'}</h1>
                        <p>{'Blarg blarg blarg blarg!'}</p>
                    </div>
                </div>
                <div className="container">
                    <div className="show-row row">
                        {showList}
                    </div>
                </div>
            </div>
        );
    }
}


Shows.propTypes = {
    actionCreators: PropTypes.object,
    shows: PropTypes.object
};
