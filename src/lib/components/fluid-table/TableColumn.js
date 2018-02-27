import { TABLE_EDIT, TABLE_EDIT_MODE } from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

export const TableColumn = ({ column, value, columnClass, tableName, index }) => {
  let colElem = <td />;
  let realValue = column.transform ? column.transform(value[column.field]) : value[column.field];
  const className = `${column.className || ''} ${columnClass || ''}`;
  if (column.component) {
    colElem = <td style={column.style} className={className}>{colElem.component({ realValue, column })}</td>;
  } else {
    colElem = (<td onDoubleClick={() => {
      if (column.editable) {
        if (FluidFunc.exists(`${TABLE_EDIT_MODE}${tableName}`)) {
          FluidFunc.start([`${TABLE_EDIT}${tableName}`, `${TABLE_EDIT_MODE}${tableName}`], {
            row: realValue,
            field: column.field,
            index: index
          });
        } else {
          FluidFunc.start(`${TABLE_EDIT}${tableName}`, {
            row: realValue,
            field: column.field,
            index: index
          });
        }
      }
    }} style={column.style} className={className}>{realValue}</td>);
  }
  return colElem;
};

TableColumn.propTypes = {
  column: PropTypes.object.isRequired,
  value: PropTypes.object,
  columnClass: PropTypes.string,
  tableName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
