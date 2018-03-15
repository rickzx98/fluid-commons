import PropTypes from 'prop-types';
import React from 'react';

export const TableEmptyMessage = ({ columns, emptyTableLabel }) => {
    return (<tr className="fluid-table-empty-row">
        <td className="fluid-table-empty-column" colSpan={columns.length}>
            <span className="fluid-table-empty-message">
                {!!emptyTableLabel && emptyTableLabel}
                {!emptyTableLabel && 'No records found.'}
            </span>
        </td></tr>);
};

TableEmptyMessage.propTypes = {
    columns: PropTypes.array.isRequired,
    emptyTableLabel: PropTypes.string
};