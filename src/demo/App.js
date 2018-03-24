import { FluidForm } from '../lib/';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.specs = () => {
            return [{
                field: 'name',
                label: 'Library Name',
                data: {require: true}
            },
                {
                    field: 'age',
                    label: 'Age'
                }]
        };
    }

    componentWillMount() {
        FluidForm.load('sampleForm', {name: 'Jerico Pogi', age: 32});
    }

    render() {
        return (
            <FluidForm name="sampleForm" fieldNode={(field) => {
                return <input key={field.name}
                 name={field.name}
                  placeholder={field.label}
                  value={FluidForm.getValue(this.props.sampleForm, field.name)}
                  />;
            }} specs={this.specs}>

                <button type="submit">Sub</button>
            </FluidForm>);
    }
}
function mapStateToProps({ fluidForm: { sampleForm } }) {
    return {
        sampleForm
    };
}
export const ConnectedApp = connect(mapStateToProps)(App);