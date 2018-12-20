import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateProp } from '../../validation/validator';
import { Dropdown as DropdownBase, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { isEmpty } from 'lodash';
import { isNullOrWs } from '../../common/util';
import classNames from 'classnames';

export default class SelectList extends Component {
    static propTypes = {
        label: PropTypes.string,
        rules: PropTypes.object,
        items: PropTypes.array.isRequired,
        selectedItems: PropTypes.array,
        isValidationVisible: PropTypes.bool,
        isFilterInputVisible: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        label: '',
        rules: {},
        selectedItems: [],
        isValidationVisible: false,
        isFilterInputVisible: false
    }

    state = {
        isOpen: false,
        filter: '',
        isModified: this.props.isValidationVisible
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ isModified: nextProps.isValidationVisible });
    }

    toggle = (event) => {
        const list = [...event.target.classList];
        const allowed = [
            'form-control',
            'dropdown-input',
            'custom-control',
            'dropdown-item',
            'custom-checkbox',
            'custom-control-input',
            'custom-control-label'
        ];

        if (list.some((l) => allowed.includes(l)))
            return;

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    resetValue = () => {
        this.props.onChange(null);
    }

    handleChange = (id) => {
        this.setState({ isModified: true });
        this.props.onChange(id);
    }

    handleFilterChange = (event) =>
        this.setState({ filter: event.target.value });

    render() {
        const { isOpen, isModified, filter } = this.state;
        const { label, selectedItems, rules, items, isFilterInputVisible } = this.props;
        const validationMessage = isModified && !isEmpty(rules)
            ? validateProp(selectedItems, rules)
            : null;
        const isValid = isEmpty(validationMessage);
        const showSuccess = isModified && isValid;
        const containerClasses = classNames('dropdown-block', {
            'is-invalid': !isValid,
            'is-valid': showSuccess
        });

        const buttonText = selectedItems.length > 0
            ? items
                .filter((i) => selectedItems.includes(i.id))
                .map((i) => i.name)
                .join(', ')
            : 'Select an item';
        const mapped = !isOpen ? [] : items
            .filter((item) => isNullOrWs(filter) || item.name.includes(filter))
            .map((item) => (
                <DropdownItem key={item.id} onClick={() => this.handleChange(item.id)}>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            checked={selectedItems.includes(item.id)}
                            readOnly
                        />
                        <label className="custom-control-label">{item.name}</label>
                    </div>
                </DropdownItem>
            ));

        return (
            <div className="form-group">
                {label && <label>{label}</label>}
                <DropdownBase className={containerClasses} isOpen={isOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {buttonText}
                    </DropdownToggle>
                    <DropdownMenu className="select-list-menu">
                        {isFilterInputVisible &&
                            <DropdownItem tag="div" className="dropdown-input">
                                <input type="text" className="form-control" value={filter} onChange={this.handleFilterChange} />
                            </DropdownItem>}
                        {isFilterInputVisible && <DropdownItem divider />}
                        {mapped}
                    </DropdownMenu>
                </DropdownBase>
                {!isValid && <div className="invalid-feedback">{validationMessage}</div>}
            </div>
        );
    }
}
