import React from "react";

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="d-flex">
                <td className="col-2">{this.props.number}</td>
                <td className="col-8">{this.props.name}</td>
                <td className="col-2">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={this.props.isActive} readOnly/>
                    </div>
                </td>
            </tr>
        );
    }
}

