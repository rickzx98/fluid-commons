import PropTypes from 'prop-types';
import React from 'react';
import { TableHeader } from './TableHeader';

export class TableHead extends React.Component {
  render() {
    return (<thead>
      <tr>{this.props.columns &&
        this.props.columns.map(column => (<TableHeader
          columnClass={this.props.columnClass}
          sort={this.thisSort} key={column.field}
          column={column} />))}</tr>
    </thead>);
  }
}

TableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  columnClass: PropTypes.string
};
