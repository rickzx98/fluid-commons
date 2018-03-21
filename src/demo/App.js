import { FluidForm } from '../lib/';
import React from 'react';

import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.specs = ()=> {
            return [{
                field: 'name',
                label: 'Library Name'
            }]
        };
    }
    render() {
        return (
            <FluidForm name="sampleForm" specs={this.specs}>
                {FluidForm.getLabel(this.props.sampleForm, 'name')}
                <input name="name" value={FluidForm.getValue(this.props.sampleForm, 'name')}
                       placeholder={FluidForm.getLabel(this.props.sampleForm,'name')}/>
            </FluidForm>);
    }
}
function mapStateToProps({fluidForm:{sampleForm}}) {
    return {
        sampleForm
    };
}
export const ConnectedApp = connect(mapStateToProps)(App);