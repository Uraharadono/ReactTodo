import React, { Fragment } from 'react';
import Alert from '../components/Alert';

class DomShowreelComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Alert type="info" noMarginBottom>
                    You can use Alerts like this.
                </Alert>

            </Fragment>
        )
    }
}

export default DomShowreelComponent;