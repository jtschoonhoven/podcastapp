import React from 'react';
import {Link} from 'react-router';


export default class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <button type="button" className="btn btn-default navbar-btn pull-right">
                            {'Sign in'}
                        </button>
                    </div>
                </nav>
            </div>
        );
    }
}
