import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';
import CardError from '../../components/CardError';
import ErrorModel from '../../models/error-model';
import classNames from 'classnames';

const CardPlaceholder = ({ title, error }) => {
    const errorClass = classNames('card-placeholder-content', { 'it-has-error': error != null });
    return (
        <div className="card card-placeholder">
            {title &&
                <div className="card-header">
                    <h3>{title}</h3>
                </div>}
            <div className={errorClass}>
                <div className="card-placeholder-spinner" >
                    {error ? <CardError
                        error={error}
                    />
                        : <div>
                            <Spinner />
                            <h5>Data is loading. Please wait</h5>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

CardPlaceholder.propTypes = {
    title: PropTypes.string,
    error: PropTypes.instanceOf(ErrorModel)
};

CardPlaceholder.defaultProps = {
    title: null,
    error: null
};


export default CardPlaceholder;
