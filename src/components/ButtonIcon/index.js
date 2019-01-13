import React from 'react';
import PropTypes from 'prop-types';
import { buttonIconType } from '../../common/prop-types';

const ButtonIcon = ({ id, onClick, type, icon, isDisabled }) => (
    <button
        id={id}
        type="button"
        className={`btn-icon btn-icon-${type}`}
        onClick={onClick}
        disabled={isDisabled}
    >
        <i className={`fa fa-${icon}`}></i>
    </button>
);

ButtonIcon.propTypes = {
    id: PropTypes.string,
    icon: PropTypes.string.isRequired,
    type: buttonIconType.isRequired,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool
};

ButtonIcon.defaultProps = {
    onClick: null,
    id: null,
    isDisabled: false
};

export default ButtonIcon;
