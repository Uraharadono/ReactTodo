import React, { Fragment } from 'react';
import Alert from '../components/Alert';
import ButtonIcon from '../components/ButtonIcon';
import ButtonToggle from '../components/ButtonToggle';
import TimeRangePicker from '../components/TimeRangePicker';
import ConfirmDialog from '../components/ConfirmDialog';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Roles from '../enums/example-enum-roles';

class DomShowreelComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    state = {
        name: '',
        isActive: true,
        isSubmitAttempted: false,
        date: '',
        isValidationVisible: false,
        isConfirmDialogOpen: false,
        isLoading: false,
        role: -1
    }

    onActivate = () => this.setState({ isActive: true })
    onDeactivate = () => this.setState({ isActive: false })

    onTimeChange = () => this.setState({ date: false })

    openDeleteConfirmDialog = () => this.setState({ isConfirmDialogOpen: true });
    closeDeleteConfirmDialog = () => this.setState({ isConfirmDialogOpen: false });
    deleteThingy = () => this.setState({ isConfirmDialogOpen: false });

    onRoleSelect = (role) => {
        // if (role === Roles.Clerk)
            // fetch stuff 
        // ..etc
        
        this.setState({ role, id: null });
    }

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

                {/* Could not be bothered to make this work atm
                
                import PropTypes from 'prop-types';
                import CardError from '../components/CardError';
                import ErrorModel from '../models/error-model';

                static propTypes = {
                    hideDialogError: PropTypes.func.isRequired,
                    error: PropTypes.instanceOf(ErrorModel)
                }

                <CardError
                    error={this.props.error}
                    close={this.props.hideDialogError}
                /> */}


                {/* Doesn't work since Card error is not working
                import CardPlaceholder from '../components/CardPlaceholder';
                <CardPlaceholder title="Title of card" error={} /> 
                */}

                <TimeRangePicker
                    from={this.state.date}
                    until={this.state.date}
                    // ruleSetFactory={ruleSetFactory}
                    onChange={this.onTimeChange}
                    isValidationVisible={this.state.isValidationVisible}
                />
                <br></br>
                <Button
                    value="Open modal"
                    icon="check"
                    type="outline-primary"
                    onClick={this.openDeleteConfirmDialog}
                    isLoading={this.state.isLoading}
                />
                <ConfirmDialog
                    isOpen={this.state.isConfirmDialogOpen}
                    close={this.closeDeleteConfirmDialog}
                    title="Confirmation"
                    text="Are you sure you want to delete the selected thingy?"
                    buttonType="danger"
                    buttonIcon="trash"
                    buttonText="Delete"
                    onConfirm={this.deleteThingy}
                />

                <Dropdown
                    label="Select something"
                    value={this.state.role}
                    // rules={rules.role}
                    isValidationVisible={this.state.isSubmitAttempted}
                    placeholder="Select a role"
                    items={Roles.enumerate()}
                    onChange={this.onRoleSelect}
                />

            </Fragment>
        )
    }
}

export default DomShowreelComponent;