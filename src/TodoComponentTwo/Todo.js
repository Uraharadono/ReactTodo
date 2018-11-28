import React from "react";

class Todo2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isActive: false,
            id: -1,
            todoItems: [

                {
                    id: 1,
                    name: "Test 1",
                    isActive: false
                },
                {
                    id: 2,
                    name: "Test 2",
                    isActive: false
                },
                {
                    id: 3,
                    name: "Test 3",
                    isActive: true
                },
                {
                    id: 4,
                    name: "Test 4",
                    isActive: true
                }
            ]
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

    manageItem = (event) => {
        event.preventDefault();

        const isEdit = !(this.state.todoItems.find(item => {
            return item.id === this.state.id;
        }) == undefined);

        if (isEdit)
            this.editItem();
        else
            this.addNewItem();

        this.clearInput();
    };

    clearInput() {
        this.setState({
            id: -1,
            name: "",
            isActive: false
        });
    }

    editItem() {
        let items = this.state.todoItems;
        var itemIndex = items.findIndex(item => {
            return item.id === this.state.id;
        });

        items[itemIndex].isActive = this.state.isActive;
        items[itemIndex].name = this.state.name;

        this.setState({
            todoItems: items
        });
    }

    addNewItem() {
        let items = this.state.todoItems;
        const nextIndex = items[items.length - 1].id + 1;

        items.push({
            id: nextIndex,
            name: this.state.name,
            isActive: this.state.isActive
        });

        this.setState({
            todoItems: items
        });
    }

    deleteItem = (event, item) => {
        event.preventDefault();
        // damn son: https://stackoverflow.com/questions/15995963/javascript-remove-array-element-on-condition
        let items = this.state.todoItems.filter(aItem => {
            return !(
                item.isActive === aItem.isActive &&
                item.id === aItem.id &&
                item.name === aItem.name
            )
        });
        this.setState({
            todoItems: items
        });
    }

    setAsEditItem = (event, item) => {
        event.preventDefault();
        this.setState({
            name: item.name,
            isActive: item.isActive,
            id: item.id
        });
    }

    render() {
        return (
            <div>
                <h3> Add new item</h3>
                <h5>
                    <strong> Note: </strong>This todo has all functionalities in one file.
                </h5>
                <hr />
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
                                    value={this.state.isActive}
                                    onChange={this.handleIsActiveChange}
                                />
                                <label className="form-check-label" htmlFor="itemActive">
                                    Example checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix">
                        <button type="submit" className="btn btn-outline-primary float-right">
                            Save
                            </button>
                    </div>
                </form>

                <div className="form-group row"></div>

                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr className="d-flex">
                                <th className="col-2">Index</th>
                                <th className="col-6">Name</th>
                                <th className="col-2">Is active</th>
                                <th className="col-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todoItems.map(item => {
                                    return (
                                        <tr className="d-flex" key={item.id}>
                                            <td className="col-2">{item.id}</td>
                                            <td className="col-6">{item.name}</td>
                                            <td className="col-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" checked={item.isActive} readOnly />
                                                </div>
                                            </td>
                                            <td className="col-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={((e) => this.deleteItem(e, item))}>Danger</button>
                                                &nbsp;
                                                <button type="button" className="btn btn-outline-info" onClick={((e) => this.setAsEditItem(e, item))}>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Todo2;