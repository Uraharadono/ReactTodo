import React from 'react';
import PropTypes from 'prop-types';

function renderIcon(icon, isLoading) {
    if (isLoading) return <i className="fa fa-refresh fa-spin" />;
    if (icon != null) return <i className={`fa fa-${icon}`} />;
    return null;
}

const Button = ({ value, icon, type, size, onClick, isLoading, isSubmit, isDisabled }) => (
    <button
        type={isSubmit ? 'submit' : 'button'}
        className={`btn btn-${type} ${size === 'small' ? 'btn-sm' : ''}`}
        onClick={onClick}
        disabled={isLoading || isDisabled}
    >
        {renderIcon(icon, isLoading)} {value}
    </button>
);

Button.defaultProps = {
    size: null,
    icon: null,
    isLoading: false,
    isSubmit: false,
    isDisabled: false,
    onClick: (i) => i
};

Button.propTypes = {
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    isSubmit: PropTypes.bool,
    size: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default Button;
