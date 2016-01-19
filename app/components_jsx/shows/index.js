import React from 'react';
import {Link} from 'react-router';
import Show from './show';
import ajax from '../../../util/ajax';

export default class Shows extends React.Component {
    componentDidMount() {
        // ajax({url: '/api/v0/shows', json: true, method: 'get'}, (err, res, data) => {
        //     if (!err && res.statusCode == 200) {
        //         this.setState({shows: data});
        //     } else {
        //         console.error('TODO: handle this err', err);
        //     }
        // });
    }

    render() {
        // const showList = this.state.shows.map(show => {
        //     return <Show {...show}/>;
        // });

        return (
            <div className="shows">
                <div className="show row">
                    <div className="deleteme" />
                </div>
            </div>
        );
    }
}
// {showList}
