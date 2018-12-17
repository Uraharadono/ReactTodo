import React, { Fragment } from 'react';
import Alert from '../components/Alert';
import ButtonIcon from '../components/ButtonIcon';

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

                <div className="card-header-controls">
                        <ButtonIcon
                            icon="plus"
                            type="primary"
                            onClick={null}
                            isDisabled={null}
                        />
                </div>

                

            </Fragment>
        )
    }
}

export default DomShowreelComponent;