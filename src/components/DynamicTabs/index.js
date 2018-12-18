import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import classNames from 'classnames';

class DynamicTabs extends Component {
    static propTypes = {
        tabs: PropTypes.array.isRequired,
        items: PropTypes.array.isRequired,
        insertTab: PropTypes.func.isRequired,
        removeTab: PropTypes.func.isRequired
    }

    state = {
        isDropdownOpen: false,
        selectedTabIndex: 0
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const oldTabs = this.props.tabs;
        const newTabs = nextProps.tabs;

        if (newTabs.length > oldTabs.length)
            this.setState({ selectedTabIndex: newTabs.length - 1 });
        else if (newTabs.length < oldTabs.length)
            this.setState({ selectedTabIndex: 0 });
    }

    toggleDropdown = () => {
        this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
    }

    handleTabChange = (index, lastIndex) => {
        if (index === lastIndex)
            return;
        this.setState({ selectedTabIndex: index });
    }

    insertTab = (event, key) => {
        event.preventDefault();
        this.props.insertTab(key);
    }

    removeTab = (event, key) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.removeTab(key);
    }

    renderDropdown = () => {
        const existing = this.props.tabs.map((tab) => tab.id);
        const items = this.props.items
            .filter((item) => !existing.includes(item.id))
            .map((item) => (
                <DropdownItem key={item.id} onClick={(event) => this.insertTab(event, item.id)}>
                    {item.name}
                </DropdownItem>
            ));

        if (items.length === 0)
            return null;

        return (
            <li className="tab-dropdown">
                <Dropdown key="new-tab-dropdown" isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle className="tab-btn-dropdown">
                        <i className="fa fa-plus" />
                    </DropdownToggle>
                    <DropdownMenu>{items}</DropdownMenu>
                </Dropdown>
            </li>
        );
    }

    renderTabs = () => {
        const hasTabs = this.props.tabs.length > 0;
        const tabs = this.props.tabs.map((tab) => (
            <Tab key={tab.id} className="nav-item">
                <a className="nav-link it-has-button">
                    {tab.name}
                    <button type="button" className="btn-icon btn-icon-danger" onClick={(e) => this.removeTab(e, tab.id)}>
                        <i className="fa fa-times" />
                    </button>
                </a>
            </Tab>
        ));

        const render = !hasTabs
            ? <li className="tab-info">Add a tab using the plus icon on the right</li>
            : tabs;

        return (
            <TabList className="nav nav-tabs">
                {render}
                {this.renderDropdown()}
            </TabList>
        );
    }

    renderTabPanels = () => (
        this.props.tabs.map((tab) => (
            <TabPanel key={tab.id} className="tab-panel" selectedClassName="tab-panel-selected">
                <tab.TabComponent {...tab} />
            </TabPanel>
        ))
    )

    render() {
        const hasTabs = this.props.tabs.length > 0;
        const classes = classNames('tab-container', {
            'it-is-empty': !hasTabs
        });
        return (
            <Tabs
                className={classes}
                selectedTabClassName="active-tab"
                onSelect={this.handleTabChange}
                selectedIndex={this.state.selectedTabIndex}
            >
                {this.renderTabs()}
                {this.renderTabPanels()}
            </Tabs>
        );
    }
}

export default DynamicTabs;
