import { FORM_ON_SUBMIT, FORM_SUBMIT } from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

export class FluidForm extends React.Component {
  static submit(tableName) {
    return FluidFunc.start(`${FORM_ON_SUBMIT}${tableName}`);
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.thisOnChange = this.onChange.bind(this);
    this.thisSubmitForm = this.submitForm.bind(this);
    const SubmitChain = FluidFunc.create(`${FORM_SUBMIT}${props.name}`);
    props.specs.forEach(spec => {
      SubmitChain.spec(spec.field, spec.data);
    });
    SubmitChain.onStart(parameter => {
      props.onSubmit(parameter);
    });

    FluidFunc.create(`${FORM_ON_SUBMIT}${props.name}`)
      .onStart(() => {
        this.thisSubmitForm();
      });
  }
  submitForm(event) {
    if (event) {
      event.preventDefault();
    }
    FluidFunc.start(`${FORM_SUBMIT}${this.props.name}`, this.state)
      .catch(this.props.onFailed);
  }
  onChange(event) {
    const state = { ...this.state };
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  render() {
    return (<form
      onChange={this.thisOnChange}
      onSubmit={this.thisSubmitForm} name={this.props.name}>
      {this.props.children}
    </form>);
  }
}

FluidForm.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  specs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFailed: PropTypes.func.isRequired
};
