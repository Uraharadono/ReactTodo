import React from "react";
import TodoItem from "./TodoItem";
import TodoManageComponent from "./TodoManageComponent";

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        // This is our reference to the child component 
        // seen here: https://stackoverflow.com/questions/37949981/call-child-method-from-parent
        // answered by: rossipedia
        this.todoManageComponent = React.createRef();        
    }

    editItem = (item) => {
        let items = this.state.todoItems;
        var itemIndex = items.findIndex(todoItem => {
            return todoItem.id === item.id;
        });

        items[itemIndex].isActive = item.isActive;
        items[itemIndex].name = item.name;

        this.setState({
            todoItems: items
        });
    }

    addItem = (item) => {
        let items = this.state.todoItems;
        const nextIndex = items[items.length - 1].id + 1;
        item.id = nextIndex;

        items.push(item);
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
        this.todoManageComponent.current.setValues(item);
    }

    render() {
        return (
            <div>
                <h3> Add new item</h3>
                <h5>
                    <strong> Note: </strong>This todo has all functionalities separated in as many files as it makes sense.
                </h5>
                <hr />
                <TodoManageComponent
                    ref={this.todoManageComponent}
                    editItem={this.editItem}
                    addItem={this.addItem}
                ></TodoManageComponent>

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
                                    return <TodoItem
                                        id={item.id}
                                        name={item.name}
                                        key={item.id}
                                        isActive={item.isActive}
                                        deleteItem={this.deleteItem}
                                        setAsEditItem={this.setAsEditItem} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Todo;