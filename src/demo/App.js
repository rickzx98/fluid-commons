import { FluidApi, FluidForm, FluidTable } from '../lib/';

import ApiInterface from './ApiInterface';
import Config from './ApiConfig';
import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.specs = ({ state }) => {
            this.form = state;
            return [{
                field: 'name',
                primaryKey: true,
                label: 'Library Name',
                isDisabled: (state) => {
                    return state.data && state.data['confirmName'] === 'hi';
                },
                data: { require: true }
            },
            {
                field: 'confirmName',
                primaryKey: true,
                label: 'Confirm Name',
                isVisible: (state) => {
                    return state && state.data['name'] === 'hello';
                },
                data: {
                    validate: (value) => new Promise((resolve, reject) => {
                        console.log('validate', this.form);
                        if (this.form) {
                            if (value === this.form.data['name']) {
                                resolve()
                            } else {
                                reject(new Error('name did not match.'));
                            }
                        } else {
                            resolve();
                        }
                    })
                }
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
            <FluidForm onSubmit={(value) => { console.log('value', value); }}
                onFailed={(error) => { console.error(error); }} name="sampleForm" fieldNode={(field) => {

                    return <input required={field.require} key={field.name}
                        disabled={field.isDisabled}
                        name={field.name}
                        placeholder={field.label}
                        value={FluidForm.getValue(this.props.sampleForm, field.name)}
                    />;
                }} specs={this.specs}>
                <button type="submit">Sub</button>
            </FluidForm>
        </FluidApi>);
    }
}
function mapStateToProps({ fluidForm: { sampleForm } }) {
    return {
        sampleForm
    };
}
export const ConnectedApp = connect(mapStateToProps)(App);