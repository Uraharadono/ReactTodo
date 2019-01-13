import React from "react";

export default class TodoManageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isActive: false,
            id: -1,
            isEdit: false
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
            <form onSubmit={this.manageItem}>
                <div className="form-group row">
                    <label htmlFor="itemName" className="col-sm-2 col-form-label" >Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="itemName"
                            value={this.state.name}
                            onChange={this.handleNameChange}
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
                            {/* <label className="form-check-label" htmlFor="itemActive">
                                Example checkbox
                            </label> */}
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                    <button type="submit" className="btn btn-outline-primary float-right">
                        Save
                </button>
                </div>
            </form>
        )
    }
}