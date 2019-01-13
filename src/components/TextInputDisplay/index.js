import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrWs, displayNullable } from '../../common/util';

const TextInputDisplay = ({ label, value, hideWhenEmpty }) => {
    if (hideWhenEmpty && isNullOrWs(value))
        return null;

    return (
        <div className="form-group">
            <label>{label}</label>
            <strong className="form-control-plaintext">
                {displayNullable(value)}
            </strong>
        </div>
    );
};

TextInputDisplay.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    hideWhenEmpty: PropTypes.bool
};

TextInputDisplay.defaultProps = {
    value: null,
    hideWhenEmpty: true
};

export default TextInputDisplay;
