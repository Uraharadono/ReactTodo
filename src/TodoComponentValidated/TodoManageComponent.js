import React from "react";
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { isInstanceValid } from '../validation/validator';
import { ruleSet } from '../TodoComponentValidated/TodoItemModel';

export default class TodoManageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isActive: false,
            id: -1,
            isEdit: false,
            isSubmitAttempted: false,
            isLoading: false
        };
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    handleIsActiveChange = () => {
        this.setState({
            // isActive: event.target.value
            isActive: !this.state.isActive
        });
    };

    setValues = (item) => {
        this.setState({
            name: item.name,
            isActive: item.isActive,
            id: item.id,
            isEdit: true
        });
    }

    clearInput() {
        this.setState({
            id: -1,
            name: "",
            isActive: false,
            isEdit: false
        });
    }

    manageItem = (event) => {
        event.preventDefault();
        this.setState({ isSubmitAttempted: true });

        if (!isInstanceValid(this.state, ruleSet))
            return;

        const isEdit = this.state.isEdit;
        const item = {
            name: this.state.name,
            isActive: this.state.isActive,
            id: this.state.id
        };

        if (isEdit)
            this.props.editItem(item);
        else
            this.props.addItem(item);

        this.clearInput();
    };

    render() {
        return (
            <div>
                <div className="form-group row">
                    <label htmlFor="itemName" className="col-sm-2 col-form-label" >Name</label>
                    <div className="col-sm-10">
                        <TextInput
                            supplierId="supplier-address-postcode"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            rules={ruleSet.name}
                            isValidationVisible={this.state.isSubmitAttempted}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2">Active</div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="itemActive"
                                checked={this.state.isActive}
                                onChange={this.handleIsActiveChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="clearfix">
                    <div className="float-right">
                        <Button
                            value="Submit"
                            icon="check"
                            type="outline-primary"
                            onClick={this.manageItem}
                            isLoading={this.state.isLoading}
                        />
                    </div>
                </div>
            </div>
        )
    }
}