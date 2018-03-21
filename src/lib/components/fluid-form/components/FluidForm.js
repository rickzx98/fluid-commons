import { FORM_CLEAR, FORM_LOAD_DATA, FORM_ON_SUBMIT, FORM_SET_FIELD, FORM_SUBMIT } from '../fluid.info';
import { mapDispatchToProps, mapStateToProps, types } from './FluidFormConfig';

import FluidFunc from 'fluid-func';
import React from 'react';
import { connect } from 'react-redux';
import initalState from '../reducer/InitialState';

export class FluidFormTag extends React.Component {

    static getLabel(form, field) {
        if (form) {
            const data = form.data;
            return data && data[field] && data[field].label ? data[field].label : '';
        }
        return '';
    }

    static getValue(form, field, transformer) {
        if (form) {
            const data = form.data;
            let value = data && data[field] && data[field].value;
            if (transformer) {
                value = transformer(value);
            }
            return value || '';
        }
        return '';
    }

    static clear(formName) {
        return FluidFunc.start(`${FORM_CLEAR}${formName}`);
    }

    static load(formName, data) {
        return FluidFunc.start(`${FORM_LOAD_DATA}${formName}`, {...data});
    }

    static submit(formName) {
        return FluidFunc.start(`${FORM_ON_SUBMIT}${formName}`);
    }

    static set(formName, field, value) {
        return FluidFunc.start(`${FORM_SET_FIELD}${formName}`, {field, value});
    }

    static on(formName, field, callback) {
        FluidFunc.create(`${formName}.${field}`)
            .onStart(param => {
                const { value } = param;
                callback(value ? value() : undefined);
            })
            .strict()
            .spec('value')
            .cache(10000);
    }

    constructor(props) {
        super(props);
        this.thisOnChange = this.onChange.bind(this);
        this.thisSubmitForm = this.submitForm.bind(this);
        this.thisLoadForm = this.loadForm.bind(this);
        const SubmitChain = FluidFunc.create(`${FORM_SUBMIT}${props.name}`);
        const LoadChain = FluidFunc.create(`${FORM_LOAD_DATA}${props.name}`);
        props.actions.resetForm(props.name, initalState);
        props.specs({dispatch: props.dispatch, formName: props.name}).forEach(spec => {
            if (spec.public) {
                FluidFunc.create(`${FORM_SET_FIELD}${props.name}`)
                    .onStart(param => {
                        const { field, value } = param;
                        props.actions.setFormValue(props.name, field(), value ? value() : undefined);
                    })
                    .spec('field', {require: true});
            }
            props.actions.initFieldData(props.name, spec);
            LoadChain.spec(spec.field, spec.data);
            SubmitChain.spec(spec.field, spec.data);
        });
        SubmitChain
            .onStart(parameter => {
                props.onSubmit(getDataFromParam(props.dispatch, props.formName, props.specs, parameter));
                this.props.actions.submitForm(props.name);
            });
        LoadChain
            .onStart(parameter => {
                this.thisLoadForm(parameter);
            })
            .onFail((error, retry, reject) => {
                this.props.onFailed({error});
                reject();
            });
        FluidFunc.create(`${FORM_ON_SUBMIT}${props.name}`)
            .onStart(() => {
                this.thisSubmitForm();
            });
        FluidFunc.create(`${FORM_CLEAR}${props.name}`)
            .onStart(() => {
                this.props.actions.resetForm(props.name, initalState);
            });
    }

    submitForm(event) {
        if (event) {
            event.preventDefault();
        }
        const form = this.props.fluidForm[this.props.name];
        FluidFunc.start(`${FORM_SUBMIT}${this.props.name}`, form ? form.data : {})
            .catch(this.props.onFailed);
    }

    onChange(event) {
        this.props.actions.setFormValue(this.props.name, event.target.name, event.target.value);
    }

    loadForm(parameter) {
        this.props.actions.loadForm(this.props.name, loadDataFromParam(this.props.dispatch, this.props.formName, this.props.specs, parameter));
    }

    render() {
        return (<form
            onChange={this.thisOnChange}
            onSubmit={this.thisSubmitForm} name={this.props.name}>
            {this.props.children}
        </form>);
    }
}

FluidFormTag.propTypes = types;

function getDataFromParam(dispatch, formName, specs, param) {
    let data = {};
    if (specs) {
        specs({dispatch, formName}).forEach(spec => {
            if (param[spec.field]) {
                data[spec.field] = param[spec.field]().value;
            }
        });
    }
    return data;
}

function loadDataFromParam(dispatch, formName, specs, param) {
    let data = {};
    if (specs) {
        specs({dispatch, formName}).forEach(spec => {
            if (param[spec.field]) {
                data[spec.field] = {
                    value: param[spec.field](),
                    label: spec.label
                };
            } else {
                data[spec.field] = {
                    label: spec.label
                };
            }
        });
    }
    return data;
}

export const FluidForm = connect(mapStateToProps, mapDispatchToProps)(FluidFormTag);
