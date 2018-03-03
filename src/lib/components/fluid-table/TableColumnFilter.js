import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';
import {TABLE_SELECT_FILTER} from './fluid.info';

export const TableColumnFilter = ({ tableName, column, value, filter }) => {
    const values = groupBy(value, column.field);
    values.unshift({value:'clear', label:column.filterLabel||`--- select ${column.label} --- `});
    return (<select value={filter[column.field]||'clear'} onChange={(event)=> FluidFunc.start(`${TABLE_SELECT_FILTER}${tableName}`, {field: column.field, value: event.target.value})}
    className={`${column.columnFilterClass || ''}`}>{values && values.map && values.map((val, index) => (<option value={val.value||val}key={column.field+'filter'+index}>{val.label||val}</option>))}</select>);
};

TableColumnFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    value: PropTypes.array,
    tableName: PropTypes.string.isRequired
};


const groupBy = function (xs, key) {
    if (xs) {
        const grouped = xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
        return Object.keys(grouped);
    }
};
