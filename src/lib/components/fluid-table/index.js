import * as actions from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export class FluidTable extends React.Component {
  static addRow(tableName) {
    return FluidFunc.start(`${actions.TABLE_ADD_ROW}${tableName}`);
  }
  static refresh(tableName) {
    return FluidFunc.start(`${actions.TABLE_REFRESH}${tableName}`);
  }
  static cancelEdit(tableName) {
    return FluidFunc.start(`${actions.TABLE_CANCEL_EDIT}${tableName}`);
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.thisSort = this.sort.bind(this);
    this.onEdit(props.onEdit);
    this.onSubmit(props.onSubmit);
    this.onSort(props.onSort);
  }
  sort(prop) {
    const sort = { ...this.state.sort };
    sort[prop.field] = prop.sort;
    if (this.props.sort) {
      this.props.sort(sort);
    } else if (FluidFunc.exists(`${actions.TABLE_SORT}${this.props.name}`)) {
      FluidFunc.start(`${actions.TABLE_SORT}${this.props.name}`, {
        sort: sort
      });
    }
    this.setState({ sort });
  }
  onEdit(callback) {
    if (callback) {
      FluidFunc.create(`${actions.TABLE_EDIT_MODE}${this.props.name}`)
        .onStart(callback);
    }
  }
  onSubmit(callback) {
    if (callback) {
      FluidFunc.create(`${actions.TABLE_EDIT_SUBMIT}${this.props.name}`)
        .onStart(callback);
    }
  }
  onSort(callback) {
    if (callback) {
      FluidFunc.create(`${actions.TABLE_SORT}${this.props.name}`)
        .onStart(callback);
    }
  }
  render() {
    return (<table
      style={this.props.style}
      className={this.props.className}>
      <TableHead columnClass={this.props.columnClass} columns={this.props.columns} />
      <TableBody onSelect={this.props.onSelect} rowClass={this.props.rowClass}
        columnClass={this.props.columnClass} name={this.props.name}
        fieldKey={this.props.fieldKey} columns={this.props.columns} value={this.props.value} />
    </table>);
  }
}
FluidTable.propTypes = {
  fieldKey: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object,
  PropTypes.array,
  PropTypes.func]),
  columns: PropTypes.array,
  sort: PropTypes.func,
  name: PropTypes.string.isRequired,
  columnClass: PropTypes.string,
  rowClass: PropTypes.string,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  onSort: PropTypes.func,
  onSelect: PropTypes.func
};


