import PropTypes from 'prop-types';
import React from 'react';

export const MergedViewValue = ({ fieldValues, field, merged }) => {
    let realValue = merged[field];
    if (fieldValues) {
        const fieldValue = fieldValues[field];
        realValue = fieldValue ? (fieldValue instanceof Function ? fieldValue(merged[field]) : fieldValue) : merged[field];
    }
    return (<span className="merged-view-value">{realValue}</span>);
};

MergedViewValue.propTypes = {
    fieldValues: PropTypes.object,
    field: PropTypes.string
};