import React from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import ButtonIcon from '../../components/ButtonIcon';

export default class TooltipIcon extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.id = uniqueId();
        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle = () =>
        this.setState({ tooltipOpen: !this.state.tooltipOpen });

    render() {
        return (
            <div>
                <ButtonIcon id={`tooltip-icon-${this.id}`} icon="question-circle" type="primary" />
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} target={`tooltip-icon-${this.id}`} toggle={this.toggle}>
                    { this.props.text }
                </Tooltip>
            </div>
        );
    }
}
