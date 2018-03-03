import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

export class FluidButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.thisOnClick = this.onClick.bind(this);
  }
  onClick() {
    if (this.props.action && FluidFunc.exists(this.props.action)) {
      this.setState({ disabled: true });
      FluidFunc.start(this.props.action, { data: this.props.data })
        .then(() => {
          this.setState({ disabled: false });
        }, () => {
          this.setState({ disabled: false });
        });
    }
  }
  render() {
    return (<button
      onClick={this.props.onClick ? this.props.onClick : this.thisOnClick}
      type={this.props.type}
      id={this.props.id}
      name={this.props.name}
      title={this.props.title}
      disabled={this.props.disabled}
      className={this.props.className}
      value={this.props.value}
      style={this.props.style}>{this.props.children}</button>);
  }
}
FluidButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.name,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  action: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string
  ])
};
