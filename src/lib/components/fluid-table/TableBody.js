import { TABLE_ADD_ROW, TABLE_CANCEL_EDIT, TABLE_EDIT, TABLE_REFRESH, TABLE_SET_NEW_VALUE, TABLE_SUBMIT_NEW_VALUE } from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';
import { TableRow } from './TableRow';

export class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [], editable: false, column: '', editableIndex: 0, newRow: {} };
    this.thisRefresh = this.refresh.bind(this);
    this.thisSetEditable = this.setEditable.bind(this);
    this.thisCancelEditable = this.cancelEditable.bind(this);
    this.thisAddRow = this.addRow.bind(this);
    this.thisSetNewRowValue = this.setNewRowValue.bind(this);
    this.thisSubmitNewRowValue = this.submitNewRowValue.bind(this);
    FluidFunc
      .create(`${TABLE_REFRESH}${this.props.name}`)
      .onStart(() => {
        this.thisCancelEditable();
        this.thisRefresh();
      });
    FluidFunc
      .create(`${TABLE_EDIT}${this.props.name}`)
      .onStart(parameter => {
        const field = parameter.field();
        const index = parameter.index();
        this.thisSetEditable(field, index);
      })
      .spec('field', { require: true })
      .spec('index', { require: true });
    FluidFunc
      .create(`${TABLE_CANCEL_EDIT}${this.props.name}`)
      .onStart(this.thisCancelEditable);
    FluidFunc.create(`${TABLE_ADD_ROW}${this.props.name}`)
      .onStart(this.thisAddRow);
    FluidFunc.create(`${TABLE_SET_NEW_VALUE}${this.props.name}`)
      .onStart(this.thisSetNewRowValue)
      .spec('field', { require: true })
      .spec('value')
      .cache(1000);
    FluidFunc.create(`${TABLE_SUBMIT_NEW_VALUE}${this.props.name}`)
      .onStart(this.thisSubmitNewRowValue);
  }
  componentWillMount() {
    this.setTableValue(this.props);
    this.refresh();
  }
  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (!(value instanceof Function)) {
      if (this.state.value !== value) {
        this.setTableValue(value);
      } else if ((this.state.value && value instanceof Array && !!value) && this.state.value.length !== value.length) {
        this.setTableValue(value);
      } else if (value instanceof Promise) {
        this.setTableValue(value);
      }
    }
  }
  refresh() {
    if (this.props.value instanceof Function) {
      const value = this.props.value();
      this.setTableValue(value);
    }
  }
  setTableValue(value) {
    if (value) {
      if (value instanceof Promise) {
        value.then(result => {
          this.setValue(result);
        });
      } else {
        this.setValue(value);
      }
    }
  }
  setValue(value) {
    if (this.state.value !== value) {
      this.setState({ value });
    }
    else if (this.state.value && value && this.state.value.length !== value.length) {
      this.setState({ value });
    }
  }
  setEditable(column, editableIndex) {
    this.setState({
      editable: true, column,
      editableIndex
    });
  }
  cancelEditable() {
    this.setState({
      editable: false,
      column: '',
      editableIndex: 0
    });
    const value = [...this.state.value];
    value.forEach((row, index) => {
      if (row.isNew) {
        value.splice(index, 1);
      }
    });
    this.setState({ value });
  }
  addRow() {
    const value = [...this.state.value];
    value.push({ isNew: true });
    this.setState({ value });
  }
  setNewRowValue(parameter) {
    const field = parameter.field();
    const value = parameter.value();
    const newRow = { ...this.state.newRow };
    newRow[field] = value;
    this.setState({ newRow });
  }
  submitNewRowValue() {
    const newRow = { ...this.state.newRow };
    const value = [...this.state.value];
    value.forEach(row => {
      if (row.isNew) {
        row.isNew = false;
        for (let field in newRow) {
          if (newRow.hasOwnProperty(field)) {
            row[field] = newRow[field];
          }
        }
      }
    });
    this.setState({ value, newRow: {} });
    return newRow;
  }
  render() {
    return (<tbody>
      {this.state.value && this.state.value.map && this.state.value.map((row, index) =>
        (<TableRow
          onSelect={this.props.onSelect}
          editableIndex={this.state.editableIndex}
          editable={this.state.editable}
          column={this.state.column}
          tableName={this.props.name}
          rowClass={this.props.rowClass}
          columnClass={this.props.columnClass}
          index={index}
          key={this.props.fieldKey ? row[this.props.fieldKey] : index}
          value={row}
          columns={this.props.columns} />))}
    </tbody>);
  }
}
TableBody.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object,
    PropTypes.func
  ]),
  columnClass: PropTypes.string,
  columns: PropTypes.array,
  fieldKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  rowClass: PropTypes.string,
  onSelect: PropTypes.func,
};
