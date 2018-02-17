import { FORM_ON_SUBMIT, FORM_SET_FIELD, FORM_SUBMIT } from '../fluid.info';
import { mapDispatchToProps, mapStateToProps, types } from './FluidFormConfig';

import FluidFunc from 'fluid-func';
import React from 'react';
import { connect } from 'react-redux';
import initalState from '../reducer/InitialState';

export class FluidFormTag extends React.Component {

  static submit(tableName) {
    return FluidFunc.start(`${FORM_ON_SUBMIT}${tableName}`);
  }
  static set(tableName, field, value) {
    return FluidFunc.start(`${FORM_SET_FIELD}${tableName}`, { field, value });
  }
  static on(tableName, field, callback) {
    FluidFunc.create(`${tableName}.${field}`)
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
    const SubmitChain = FluidFunc.create(`${FORM_SUBMIT}${props.name}`);
    props.specs.forEach(spec => {
      if (spec.public) {
        FluidFunc.create(`${FORM_SET_FIELD}${props.name}`)
          .onStart(param => {
            const { field, value } = param;
            props.actions.setFormValue(props.name, field(), value ? value() : undefined);
          })
          .spec('field', { require: true });
      }
      SubmitChain.spec(spec.field, spec.data);
    });
    SubmitChain
      .onStart(parameter => {
        props.onSubmit(parameter);
        this.props.actions.submitForm(props.name);
      });
    FluidFunc.create(`${FORM_ON_SUBMIT}${props.name}`)
      .onStart(() => {
        this.thisSubmitForm();
      });
  }
  componentWillMount() {
    this.props.actions.resetForm(this.props.name, initalState);
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
  render() {
    return (<form
      onChange={this.thisOnChange}
      onSubmit={this.thisSubmitForm} name={this.props.name}>
      {this.props.children}
    </form>);
  }
}

FluidFormTag.propTypes = types;


export const FluidForm = connect(mapStateToProps, mapDispatchToProps)(FluidFormTag);
