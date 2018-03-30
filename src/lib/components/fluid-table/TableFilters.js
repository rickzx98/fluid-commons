import PropTypes from 'prop-types';
import React from 'react';
import { TableColumnFilter } from './TableColumnFilter';

export const TableFilters = ({ columns, value, tableName, filter }) => {
    return (<tr className="fluid-table-filter-row">
        {columns && columns.filter(column => !column.skipRender).map((column, index) => (<td key={column.field + index}>
            {column.filter &&
                (<TableColumnFilter
                    filter={filter}
                    tableName={tableName}
                    column={column} value={value} />)}
        </td>))}
    </tr>);
};
TableFilters.propTypes = {
    filter: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    value: PropTypes.array,
    tableName: PropTypes.string.isRequired
};