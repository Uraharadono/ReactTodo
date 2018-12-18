import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class TimePicker extends Component {
    reference = React.createRef() // eslint-disable-line

    static propTypes = {
        value: PropTypes.string,
        inputClasses: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        value: '',
        inputClasses: 'form-control'
    }

    state = {
        isPickerVisible: false
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutside, true);
    }

    onDatePickerChange = (value) => {
        this.setState({ isPickerVisible: false }, () => {
            this.props.onChange(value.format('HH:mm'));
        });
    }

    onDateInputChange = (event) => {
        this.props.onChange(event.target.value);
    }

    onInputFocus = () => {
        this.setState({ isPickerVisible: true });
    }

    onInputBlur = () => {
        const value = moment(this.props.value, ['HHmm', 'HH:mm', 'HH-mm', 'HH'], true);

        if (value.isValid()) {
            this.props.onChange(value.format('HH:mm'));
        }
    }

    onClickOutside = (e) => {
        const parent = this.reference.current;

        if (!parent || !parent.contains(e.target)) {
            this.setState({ isPickerVisible: false });
        }
    }

    renderDatePicker() {
        const parsed = moment(this.props.value, ['HHmm', 'HH:mm', 'HH-mm'], true);
        const value = parsed.isValid() ? parsed : null;

        return (
            <DatePicker
                inline
                timeCaption={null}
                selected={value}
                onChange={this.onDatePickerChange}
                showTimeSelect
                timeIntervals={30}
                showTimeSelectOnly
                timeFormat={'HH:mm'}
                dateFormat={'HH:mm'}
            />
        );
    }

    render() {
        return (
            <div className="timepicker" ref={this.reference}>
                <input
                    type="text"
                    className={this.props.inputClasses}
                    value={this.props.value}
                    onChange={this.onDateInputChange}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                />
                {this.state.isPickerVisible && this.renderDatePicker()}
            </div>
        );
    }
}
