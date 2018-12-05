import React from "react";

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="d-flex">
                <td className="col-2">{this.props.id}</td>
                <td className="col-6">{this.props.name}</td>
                <td className="col-2">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={this.props.isActive} readOnly/>
                    </div>
                </td>
                <td className="col-2">
                {/* <button type="button" className="btn btn-outline-danger" onClick={this.props.deleteItem(this.props)}>Danger</button> */}
                <button type="button" className="btn btn-outline-danger" onClick={((e) => this.props.deleteItem(e, this.props))}>Danger</button>
                &nbsp;
                <button type="button" className="btn btn-outline-info" onClick={((e) => this.props.setAsEditItem(e, this.props))}>Edit</button>
                </td>
            </tr>
        );
    }
}

