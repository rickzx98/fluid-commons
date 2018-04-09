import { FluidApi, FluidForm } from '../lib/';

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
                data: {
                    require: true, default: 'FU',
                    validate: (value) => new Promise((resolve, reject) => {
                        if (value === 'FU') {
                            reject(new Error('Come on!'));
                        } else {
                            resolve();
                        }
                    })
                }
            },
            {
                group: 'page 1',
                field: 'confirmName',
                primaryKey: true,
                label: 'Confirm Name',
                data: {
                    validate: (value) => new Promise((resolve, reject) => {
                        if (this.form) {
                            if (value === this.form.data['name']) {
                                resolve()
                            } else {
                                reject('name did not match.');
                            }
                        } else {
                            resolve();
                        }
                    })
                }
            },
            {
                group: 'page 2',
                field: 'age',
                label: 'Age',
                skipRender: true
            }]
        };
    }
    render() {
        return (<FluidApi environment="dev" api={ApiInterface} config={Config}>
            <FluidForm onSubmit={(value) => { console.log('value', value); }}
                onFailed={(error) => { console.error(error); }} name="sampleForm"
                fieldNodeGroup={(groups) => {
                    console.log('groups', groups);
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