import React from "react";

class Todo2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isActive: false,
            todoItems: [

                {
                    number: 1,
                    name: "Test 1",
                    isActive: false
                },
                {
                    number: 2,
                    name: "Test 2",
                    isActive: false
                },
                {
                    number: 3,
                    name: "Test 3",
                    isActive: true
                },
                {
                    number: 4,
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
        this.addNewItem();
    };

    addNewItem() {
        let items = this.state.todoItems;
        const nextIndex = items[items.length - 1].number + 1;

        items.push({
            number: nextIndex,
            name: this.state.name,
            isActive: this.state.isActive
        });

        this.setState({
            todoItems: items
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
                    <div className="">
                        <div className="clearfix">
                            <button type="submit" className="btn btn-outline-primary float-right">
                                Add
                            </button>
                        </div>
                    </div>
                </form>

                <div className="form-group row"></div>

                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr className="d-flex">
                                <th className="col-2">Index</th>
                                <th className="col-8">Name</th>
                                <th className="col-2">Is active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todoItems.map(item => {
                                    return (
                                        <tr className="d-flex" key={item.number}>
                                            <td className="col-2">{item.number}</td>
                                            <td className="col-8">{item.name}</td>
                                            <td className="col-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" checked={item.isActive} readOnly />
                                                </div>
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