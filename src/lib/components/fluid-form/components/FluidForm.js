import { FORM_CLEAR, FORM_INVALID, FORM_LOAD_DATA, FORM_ON_SUBMIT, FORM_SET_FIELD, FORM_SUBMIT } from '../fluid.info';
import { mapDispatchToProps, mapStateToProps, types } from './FluidFormConfig';

import FluidFunc from 'fluid-func';
import FormValue from './FormValue';
import React from 'react';
import { connect } from 'react-redux';
import initalState from '../reducer/InitialState';

export class FluidFormTag extends React.Component {

    static invalid(formName, field, message) {
        return FluidFunc.start(`${FORM_INVALID}${formName}`, { field, message });
    }

    static getValue(form, field, transformer) {
        if (form) {
            const data = form.data;
            let value = data && data[field];
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
        return FluidFunc.start(`${FORM_LOAD_DATA}${formName}`, { ...data });
    }

    static submit(formName) {
        return FluidFunc.start(`${FORM_ON_SUBMIT}${formName}`);
    }

    static set(formName, field, value) {
        return FluidFunc.start(`${FORM_SET_FIELD}${formName}`, { field, value });
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
        this.thisRenderField = this.renderField.bind(this);
        const SubmitChain = FluidFunc.create(`${FORM_SUBMIT}${props.name}`);
        const LoadChain = FluidFunc.create(`${FORM_LOAD_DATA}${props.name}`);
        let defaults = {};
        this.thisSpecs = props.specs({ state: this.props.fluidForm[props.name], formName: props.name });
        this.thisSpecs.forEach(spec => {
            if (spec.public) {
                FluidFunc.create(`${FORM_SET_FIELD}${props.name}`)
                    .onStart(param => {
                        const { field, value } = param;
                        props.actions.setFormValue(props.name, field(), value ? value() : undefined);
                    })
                    .spec('field', { require: true });
            }
            if (spec.data && spec.data.default) {
                defaults[spec.field] = spec.data.default;
            }
            LoadChain.spec(spec.field, spec.data);
            SubmitChain.spec(spec.field, spec.data);
        });
        props.actions.resetForm(props.name, initalState, defaults);
        SubmitChain
            .onStart(parameter => {
                props.onSubmit(new FormValue(this.thisSpecs, parameter));
                this.props.actions.submitForm(props.name);
            });
        LoadChain
            .onStart(parameter => {
                this.thisLoadForm(parameter);
            })
            .onFail((stack, retry, reject) => {
                if (stack.error && stack.error instanceof Array) {
                    const errorFields = stack.error.map(err => ({ field: err.field, message: err.error && (err.error.message || err.error) }));
                    this.props.actions.invalidForm(props.name, errorFields)
                }
                if (this.props.onFailed) {
                    this.props.onFailed({ stack });
                }
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
        FluidFunc.create(`${FORM_INVALID}${props.name}`)
            .onStart(({ field, message }) => {
                let msg;
                if (message) {
                    msg = message();
                }
                this.props.actions.invalidForm(props.name, field(), msg);
            })
            .spec('field', { require: true });
    }
    componentDidUpdate() {
        this.thisSpecs = this.props.specs({ state: this.props.fluidForm[this.props.name], formName: this.props.name });
    }
    submitForm(event) {
        if (event) {
            event.preventDefault();
        }
        const form = this.props.fluidForm[this.props.name];
        FluidFunc.start(`${FORM_SUBMIT}${this.props.name}`, form ? form.data : {})
            .catch(stack => {
                if (stack.error && stack.error instanceof Array) {
                    const errorFields = stack.error.map(err => ({ field: err.field, message: err.error && (err.error.message || err.error) }));
                    this.props.actions.invalidForm(this.props.name, errorFields)
                }
                if (this.props.onFailed) {
                    this.props.onFailed({ stack });
                }
            });
    }

    onChange(event) {
        this.props.actions.setFormValue(this.props.name, event.target.name, event.target.value);
    }

    loadForm(parameter) {
        this.props.actions.loadForm(this.props.name, new FormValue(this.thisSpecs, parameter).getRawValue());
    }
    renderField(spec) {
        let isRender = !spec.skipRender;
        if (isRender) {
            isRender = spec.isVisible ? spec.isVisible instanceof Function && spec.isVisible(this.props.fluidForm[this.props.name]) : true;
        }
        return isRender;
    }
    render() {
        return (<form
            onChange={this.thisOnChange}
            onSubmit={this.thisSubmitForm} name={this.props.name}>
            {this.thisSpecs && this.props.fieldNode && this.thisSpecs.filter(spec => this.thisRenderField(spec)).map((field, index) =>
                this.props.fieldNode(createField(field, this.props.fluidForm[this.props.name]), index))}
            {this.props.children}
        </form>);
    }
}

function createField(field, fluidForm = { data: {} }) {
    let isInvalid;
    let invalidMessage;
    if (fluidForm.invalid && fluidForm.errorFields) {
        const invalidField = fluidForm.errorFields.filter(err => err.field === field.field)[0];
        if (invalidField) {
            isInvalid = true;
            invalidMessage = invalidField.message;
        }
    }
    return {
        name: field.field,
        label: field.label,
        require: field.data && field.data.require ? (field.data.require instanceof Function ? field.data.require() : field.data.require) : false,
        isDisabled: field.isDisabled && field.isDisabled(fluidForm),
        isInvalid,
        invalidMessage,
        group: field.group,
    };
}

FluidFormTag.propTypes = types;

export const FluidForm = connect(mapStateToProps, mapDispatchToProps)(FluidFormTag);
