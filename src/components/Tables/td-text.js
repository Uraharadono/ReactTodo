import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shortenNullable } from '../../common/util';

export default class TdText extends Component {
    static propTypes = {
        children: PropTypes.string,
        maxLen: PropTypes.number
    }

    static defaultProps = {
        children: '',
        maxLen: 150
    }

    state = {
        isExpanded: false
    }

    toggleText = (event) => {
        event.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    renderText() {
        const text = !this.state.isExpanded
            ? shortenNullable(this.props.children, this.props.maxLen)
            : this.props.children;
        return <span>{text}</span>;
    }

    renderLink() {
        const { children = '', maxLen } = this.props;
        if (children == null || children.length <= maxLen)
            return null;
        return (
            <a href="#" onClick={this.toggleText}>
                {this.state.isExpanded ? 'Read less' : 'Read more'}
            </a>
        );
    }

    render() {
        return (
            <td className="td-text">
                {this.renderText()}
                {this.renderLink()}
            </td>
        );
    }
}
