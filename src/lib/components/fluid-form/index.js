import * as actions from './actions/FluidFormActions';

import { FORM_ON_SUBMIT, FORM_SUBMIT } from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initalState from './reducer/InitialState';

class FluidFormTag extends React.Component {
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
  componentWillMount() {
    this.props.actions.resetForm(this.props.name, initalState);
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

FluidFormTag.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  specs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFailed: PropTypes.func.isRequired
};
function mapStateToProps() { }
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export const FluidForm = connect(mapStateToProps, mapDispatchToProps)(FluidFormTag);
export const Actions = actions;