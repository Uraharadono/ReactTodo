import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabContent extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        descriptionExcerpt: PropTypes.string.isRequired,
        isSubmitAttempted: PropTypes.bool.isRequired,
        handleDescriptionChange: PropTypes.func.isRequired,
        handleDescriptionExcerptChange: PropTypes.func.isRequired
    }

    handleDescriptionChange = (event) => {
        const value = event.target.value;
        this.props.handleDescriptionChange(this.props.id, value);
    }

    handleDescriptionExcerptChange = (event) => {
        const value = event.target.value;
        this.props.handleDescriptionExcerptChange(this.props.id, value);
    }

    render() {
        return (
            <div key={this.props.id}>
                <h1>Id: {this.props.id}</h1>
                <h1>Name: {this.props.name}</h1>
                <h1>Description: {this.props.description}</h1>
            </div>
        );
    }
}

export default TabContent;
