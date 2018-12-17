import React, { Fragment } from 'react';
import Alert from '../components/Alert';
import ButtonIcon from '../components/ButtonIcon';
import ButtonToggle from '../components/ButtonToggle';

class DomShowreelComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        isActive: true,
        isSubmitAttempted: false
    }

    onActivate = () => this.setState({ isActive: true })
    onDeactivate = () => this.setState({ isActive: false })


    render() {
        return (
            <Fragment>
                <Alert type="info" noMarginBottom>
                    You can use Alerts like this.
                </Alert>

                <div className="card-header-controls">
                        <ButtonIcon
                            icon="plus"
                            type="primary"
                            onClick={null}
                            isDisabled={null}
                        />
                </div>

                <ButtonToggle
                        label="Is this awesome?"
                        isActive={this.state.isActive}
                        onActivate={this.onActivate}
                        onDeactivate={this.onDeactivate}
                />

                
            </Fragment>
        )
    }
}

export default DomShowreelComponent;