import { MergedViewLabel } from './MergedViewLabel';
import { MergedViewValue } from './MergedViewValue';
import PropTypes from 'prop-types';
import React from 'react';

export const MergedViewItems = ({ merged, fieldElement, fieldLabels, fieldValues }) => {
    return (<span>
        {Object.keys(merged).map(field => {
            return fieldElement ? fieldElement({
                field: field,
                mergedValue: merged,
                fieldLabels: fieldLabels
            }) : (<div key={field} className="merged-view-field">
                <MergedViewLabel field={field} fieldLabels={fieldLabels} />
                <MergedViewValue field={field} merged={merged} fieldValues={fieldValues} />
            </div>);
        })}
    </span>)
};
MergedViewItems.propTypes = {
    fieldLabels: PropTypes.object,
    fieldValues: PropTypes.object,
    merged: PropTypes.object.isRequired,
    fieldElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
        PropTypes.object,
        PropTypes.func
    ])
};