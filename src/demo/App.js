import { FluidApi, FluidForm, FluidTable } from '../lib/';

import ApiInterface from './ApiInterface';
import Config from './ApiConfig';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.specs = () => {
            return [{
                field: 'name',
                primaryKey: true,
                label: 'Library Name',
                data: { require: true }
            },
            {
                field: 'age',
                label: 'Age',
                skipRender: true
            }]
        };
    }

    componentWillMount() {
        FluidForm.load('sampleForm', { name: 'Jerico Pogi', age: 32 });
    }

    render() {
        return (<FluidApi environment="dev" api={ApiInterface} config={Config}>
            <FluidForm onSubmit={(value) => { console.log('value', value); }} onFailed={() => { }} name="sampleForm" fieldNode={(field) => {
                return <input key={field.name}
                    name={field.name}
                    placeholder={field.label}
                    value={FluidForm.getValue(this.props.sampleForm, field.name)}
                />;
            }} specs={this.specs}>
                <button type="submit" onClick={() => {
                    FluidApi.execute('addPeople');
                }}>Sub</button>
            </FluidForm>
            <FluidTable onSelect={(rowValue)=>{ console.log(rowValue.getPrimaryKey())}}columns={this.specs()} value={[{name:'Jerico', age:2}, {name:'Nica', age:14}]}/>
        </FluidApi>);
    }
}
function mapStateToProps({ fluidForm: { sampleForm } }) {
    return {
        sampleForm
    };
}
export const ConnectedApp = connect(mapStateToProps)(App);