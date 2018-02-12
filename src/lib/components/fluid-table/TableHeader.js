import PropTypes from 'prop-types';
import React from 'react';
export class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.thisOnClick = this.onClick.bind(this);
  }
  componentWillMount() {
    this.setInitState();
  }
  setInitState() {
    this.setState({
      sort: ''
    });
    this.setStyle();
    this.setClassName();
  }
  setStyle() {
    const style = { ...this.props.column.style, cursor: 'pointer' };
    this.setState({ style });
  }
  setClassName(clz) {
    const className = `${this.props.columnClass || ''} ${this.props.column.className || ''} ${clz || ''}`;
    this.setState({ className });
  }
  onClick() {
    if (this.state.sort === '') {
      this.setState({ sort: 'asc' });
    } else if (this.state.sort === 'asc') {
      this.setState({ sort: 'desc' });
    } else {
      this.setState({ sort: '' });
    }
    if (this.props.sort) {
      this.props.sort({ field: this.props.column.field, sort: this.state.sort });
    }
    this.setClassName(this.state.sort);
  }
  render() {
    const column = this.props.column;
    let colElem = <th />;
    if (column.headerComponent) {
      colElem = <th onClick={this.thisOnClick} style={this.state.style} className={this.state.className}>{colElem.headerComponent({ column })}</th>;
    } else {
      colElem = <th onClick={this.thisOnClick} style={this.state.style} className={this.state.className}>{column.label || column.field}</th>;
    }
    return colElem;
  }
}

TableHeader.propTypes = {
  column: PropTypes.object.isRequired,
  columnClass: PropTypes.string,
  sort: PropTypes.func
};
