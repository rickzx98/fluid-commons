import { FluidForm } from '../lib/';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.specs = () => {
            return [{
                field: 'name',
                label: 'Library Name'
            },
            {
                field: 'age',
                label: 'Age'
            }]
        };
    }
    render() {
        return (
            <FluidForm name="sampleForm" fieldNode={(field) => {
                return <input key={field.name} name={field.name} placeholder={field.label} required={field.require} />;
            }} specs={this.specs}>Hello World!</FluidForm>);
    }
}
function mapStateToProps({ fluidForm: { sampleForm } }) {
    return {
        sampleForm
    };
}
export const ConnectedApp = connect(mapStateToProps)(App);