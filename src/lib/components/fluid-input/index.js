import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class FluidInput extends React.Component {
    constructor(props) {
        super(props);
        this.thisGetValue = this.getValue.bind(this);
      }

    getValue(){
      const valueFromForm = this.props.dataSrc ? this.props.fluidForm.data[this.props.name] : '';
      const value = this.props.transform ? this.props.transform(valueFromForm):valueFromForm;
      return value;
    }

    render() {
        return (<input
          alt={this.props.alt}
          size={this.props.size}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          checked={this.props.checked}
          accept={this.props.accept}
          type={this.props.type}
          id={this.props.id}
          name={this.props.name}
          title={this.props.title}
          disabled={this.props.disabled}
          className={this.props.className}
          value={this.props.value || this.thisGetValue()}
          style={this.props.style} />);
    }
}
function mapStateToProps(state, props){
  return {
      fluidForm: state.fluidForm[props.dataSrc] || {data:{}}
  };
}
export const ConnectedFluidInput = connect(mapStateToProps)(FluidInput);

FluidInput.propTypes = {
  fluidForm: PropTypes.object.isRequired,
  transform: PropTypes.func,
    accept: PropTypes.string,
    checked: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    size: PropTypes.number,
    alt: PropTypes.string,
    type: PropTypes.string,
    src: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    action: PropTypes.string,
    dataSrc: PropTypes.string
};
