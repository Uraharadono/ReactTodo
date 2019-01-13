import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrWs, displayNullable } from '../../common/util';

const TextAreaDisplay = ({ label, value, hideWhenEmpty }) => {
    if (hideWhenEmpty && isNullOrWs(value))
        return null;

    return (
        <div className="form-group">
            <label>{label}</label>
            <p className="form-control-plaintext">
                {displayNullable(value)}
            </p>
        </div>
    );
};

TextAreaDisplay.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    hideWhenEmpty: PropTypes.bool
};

TextAreaDisplay.defaultProps = {
    value: null,
    hideWhenEmpty: true
};

export default TextAreaDisplay;
