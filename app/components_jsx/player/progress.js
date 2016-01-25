import React from 'react';

export default class Progress extends React.Component {
    render() {
        return (
            <div id="progress" className="progress col-xs-8 col-sm-9">
                    <div className="progress-bar progress-bar-success" style={{width: '35%'}}>
                        <span className="sr-only">{'35% Complete (success)'}</span>
                    </div>
                    <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: '20%'}}>
                        <span className="sr-only">{'20% Complete (warning)'}</span>
                    </div>
            </div>
        );
    }
}
