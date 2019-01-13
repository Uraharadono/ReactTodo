import React, { Component } from 'react';
import Spinner from '../../components/Spinner';

export default class LoadingIndicator extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="page-loading-indicator">
                <div className="page-loading-indicator-content">
                    <Spinner />
                    <h5>The page is loading. Please wait...</h5>
                </div>
            </div>
        );
    }
}
