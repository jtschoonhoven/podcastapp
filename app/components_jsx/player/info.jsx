import React from 'react';

export default class Info extends React.Component {
    render() {
        return (
            <div className="info">
                <button type="button" className="btn btn-link btn-lg navbar-btn navbar-left">
                    {this.props.title}
                </button>
            </div>
        );
    }
}
