import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmDialog = ({ isOpen, close, title, text, buttonType, buttonIcon, buttonText, onConfirm }) => (
    <Modal isOpen={isOpen}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>
            <span>{text}</span>
        </ModalBody>
        <ModalFooter>
            <Button value={buttonText} type={buttonType} icon={buttonIcon} onClick={onConfirm} />
            <Button value="Close" type="outline-secondary" icon="times" onClick={close} />
        </ModalFooter>
    </Modal>
);

ConfirmDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    buttonType: PropTypes.string,
    buttonIcon: PropTypes.string,
    buttonText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired
};

ConfirmDialog.defaultProps = {
    title: '',
    type: null,
    buttonType: 'success',
    buttonIcon: 'check',
    buttonText: 'Yes'
};

export default ConfirmDialog;
