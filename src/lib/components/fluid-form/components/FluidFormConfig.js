import * as actions from '../actions/FluidFormActions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

export const types = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  fieldNode: PropTypes.func,
  specs: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFailed: PropTypes.func.isRequired,
  fluidForm: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return {
    fluidForm: state.fluidForm
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
