import PropTypes from 'prop-types';
import React from 'react';

export const MergedViewLabel = ({ fieldLabels, field }) => {
    let realLabel = field;
    if (fieldLabels) {
        const fieldLabel = fieldLabels[field];
        realLabel = fieldLabel ? (fieldLabel instanceof Function ? fieldLabel(field) : fieldLabel) : field;
    }
    return (<span className="merged-view-label">{realLabel}</span>);
};

MergedViewLabel.propTypes = {
    fieldLabels: PropTypes.object,
    field: PropTypes.string
};