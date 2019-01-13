import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';

const ButtonToggle = ({
    label,
    isActive,
    onActivate,
    onDeactivate,
    activateButtonText,
    deactivateButtonText,
    size
}) => (
    <div className="form-group">
        {label && <label className="d-block">{label}</label>}
        <div className="btn-group" role="group">
            <Button
                value={activateButtonText}
                type={isActive ? 'primary' : 'outline-secondary'}
                onClick={onActivate}
                size={size}
            />
            <Button
                value={deactivateButtonText}
                type={!isActive ? 'primary' : 'outline-secondary'}
                onClick={onDeactivate}
                size={size}
            />
        </div>
    </div>
);

ButtonToggle.propTypes = {
    label: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
    onDeactivate: PropTypes.func.isRequired,
    activateButtonText: PropTypes.string,
    deactivateButtonText: PropTypes.string,
    size: PropTypes.string
};

ButtonToggle.defaultProps = {
    size: null,
    label: null,
    activateButtonText: 'Yes',
    deactivateButtonText: 'No'
};

export default ButtonToggle;
