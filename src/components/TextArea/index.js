import React from 'react';
import PropTypes from 'prop-types';
import { validateProp } from '../../validation/validator';
import { isEmpty, isFunction } from 'lodash';
import classNames from 'classnames';
import TextAreaAutosize from 'react-textarea-autosize';

export default class TextArea extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        rules: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        isValidationVisible: PropTypes.bool,
        isExpandable: PropTypes.bool,
        noMarginBottom: PropTypes.bool
    }

    static defaultProps = {
        rules: {},
        value: '',
        isExpandable: true,
        isValidationVisible: false,
        noMarginBottom: false
    }

    state = {
        isModified: this.props.isValidationVisible
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.isValidationVisible)
            return;
        this.setState({ isModified: true });
    }

    handleChange = (event) => {
        this.setState({
            isModified: true
        });

        if (isFunction(this.props.onChange))
            this.props.onChange(event);
    }

    renderStaticTextArea(id, inputClass, value) {
        return (
            <textarea
                id={id}
                className={inputClass}
                value={value}
                onChange={this.handleChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                rows="4"
            />
        );
    }

    renderExpandableTextArea(id, inputClass, value) {
        return (
            <TextAreaAutosize
                id={id}
                className={inputClass}
                value={value}
                onChange={this.handleChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                minRows={4}
            />
        );
    }

    render() {
        const { isModified } = this.state;
        const { id, label, value, rules, noMarginBottom } = this.props;
        const validationMessage = isModified && !isEmpty(rules)
            ? validateProp(value, rules)
            : null;
        const isValid = isEmpty(validationMessage);
        const showSuccess = isModified && isValid;
        const inputClass = classNames('form-control', {
            'is-invalid': !isValid,
            'is-valid': showSuccess,
            'is-expandable': this.props.isExpandable
        });
        const containerClasses = classNames('form-group', {
            'mb-0': noMarginBottom
        });

        return (
            <div className={containerClasses}>
                <label htmlFor={id}>{label}</label>
                {this.props.isExpandable
                    ? this.renderExpandableTextArea(id, inputClass, value)
                    : this.renderStaticTextArea(id, inputClass, value)}
                {!isValid && <div className="invalid-feedback">{validationMessage}</div>}
            </div>
        );
    }
}
