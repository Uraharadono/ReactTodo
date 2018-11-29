import React from 'react';
import Spinner from '../../components/Spinner/index';


const ComponentLoader = ({ isVisible }) => {
    if (!isVisible)
        return null;
    return (
        <div className="component-loader">
            <Spinner />
        </div>
    );
};

export default ComponentLoader;
