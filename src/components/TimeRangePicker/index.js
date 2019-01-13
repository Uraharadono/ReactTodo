import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimePicker from '../../components/TimePicker';
import { validateProp } from '../../validation/validator';
import { isEmpty, isFunction } from 'lodash';
import classNames from 'classnames';

class TimeRangePicker extends Component {
    static propTypes = {
        from: PropTypes.string,
        until: PropTypes.string,
        isDisabled: PropTypes.bool,
        isValidationVisible: PropTypes.bool,
        ruleSetFactory: PropTypes.func,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        from: '',
        until: '',
        ruleSetFactory: null,
        isDisabled: false,
        isValidationVisible: false
    }

    state = {
        isModified: this.props.isValidationVisible
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            isModified: nextProps.isValidationVisible || false
        });
    }

    onFromChange = (from) => {
        this.setState({ isModified: true }, () => {
            this.props.onChange(from, this.props.until);
        });
    }

    onUntilChange = (until) => {
        this.setState({ isModified: true }, () => {
            this.props.onChange(this.props.from, until);
        });
    }

    render() {
        const { isModified } = this.state;
        const { from, until, ruleSetFactory, isDisabled } = this.props;

        const ruleSet = isFunction(ruleSetFactory)
            ? ruleSetFactory(until)
            : {};

        const fromMessage = isModified && !isEmpty(ruleSet.openFrom)
            ? validateProp(from, ruleSet.openFrom)
            : null;
        const untilMessage = isModified && !isEmpty(ruleSet.openUntil)
            ? validateProp(until, ruleSet.openUntil)
            : null;
        const validationMessage = [fromMessage, untilMessage]
            .filter((m) => !isEmpty(m))
            .join(', ')
            .trim();

        const isFromValid = isEmpty(fromMessage);
        const isUntilValid = isEmpty(untilMessage);
        const isValid = isFromValid && isUntilValid;

        const fromInputClasses = classNames('form-control', {
            'is-invalid': !isFromValid && !isDisabled,
            'is-valid': isModified && isFromValid && !isDisabled
        });

        const untilInputClasses = classNames('form-control', {
            'is-invalid': !isUntilValid && !isDisabled,
            'is-valid': isModified && isUntilValid && !isDisabled
        });

        return (
            <div className="time-range-picker">
                <div className="time-range-picker-content">
                    <div className="time-range-picker-section">
                        <span>From</span>
                        <TimePicker
                            value={from}
                            inputClasses={fromInputClasses}
                            onChange={this.onFromChange}
                        />
                    </div>
                    <div className="time-range-picker-section">
                        <span>To</span>
                        <TimePicker
                            value={until}
                            inputClasses={untilInputClasses}
                            onChange={this.onUntilChange}
                        />
                    </div>
                </div>
                {!isValid && <div className="invalid-feedback">{validationMessage}</div>}
            </div>
        );
    }
}

export default TimeRangePicker;

