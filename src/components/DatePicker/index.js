import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { validateProp } from '../../validation/validator';
import { isEmpty } from 'lodash';
import { isDateFuture, momentDate } from '../../common/util';
import classNames from 'classnames';
import moment from 'moment';

const validFormats = [
    'DD-MM-YYYY'
];

function parseDate(value) {
    const date = moment(value, moment.ISO_8601);
    return date.isValid() ? date : null;
}

export default class DateInputInline extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        rules: PropTypes.object,
        minDate: PropTypes.string,
        maxDate: PropTypes.string
    }

    static defaultProps = {
        minDate: null,
        maxDate: null,
        rules: {},
        value: ''
    }

    state = {
        validationMessage: null,
        showValidationMessage: false,
        selectedDate: parseDate(this.props.value)
    }

    UNSAFE_componentWillMount() {
        const { value, rules } = this.props;
        if (!isEmpty(rules)) this.setState({ validationMessage: validateProp(value, rules) });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            selectedDate: parseDate(nextProps.value),
            validationMessage: validateProp(nextProps.value, nextProps.rules),
            showValidationMessage: this.state.showValidationMessage || this.props.value !== nextProps.value
        });
    }

    handleChange = (date) => {
        this.props.onChange(date ? date.format() : null);
    }

    handleChangeRaw = (event) => {
        if (isEmpty(event.target.value)) {
            this.props.onChange(null);
        } else {
            const date = moment(event.target.value, validFormats, true);
            if (date.isValid()) {
                this.handleChange(date);
            } else {
                this.setState({
                    validationMessage: validateProp('invalid', this.props.rules),
                    showValidationMessage: true
                });
                this.props.onChange('invalid');
            }
        }
    }

    render() {
        const { id, label, minDate } = this.props;
        const { validationMessage, showValidationMessage } = this.state;
        const isValid = !showValidationMessage ? true : isEmpty(validationMessage);
        const inputClass = classNames('form-control', { 'is-invalid': !isValid });

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <DatePicker
                    locale="nl"
                    className={inputClass}
                    selected={this.state.selectedDate}
                    onChange={this.handleChange}
                    onChangeRaw={this.handleChangeRaw}
                    dateFormat={validFormats}
                    minDate={momentDate(this.props.minDate)}
                    maxDate={momentDate(this.props.maxDate)}
                    filterDate={minDate == null ? isDateFuture : null}
                    disabledKeyboardNavigation
                />
                {!isValid && <div className="invalid-feedback d-block">{validationMessage}</div>}
            </div>
        );
    }
}
