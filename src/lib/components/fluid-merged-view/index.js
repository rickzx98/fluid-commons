import { MergedViewItems } from './content/MergedViewItems';
import PropTypes from 'prop-types';
import React from 'react';

export class FluidMergedView extends React.Component {
    render() {
        let merged = {};
        this.props.value.forEach(val => {
            merged = Object.assign(merged, { ...val });
        });
        return (<div className="fluid-merge-view">
            <MergedViewItems
                fieldValues={this.props.fieldValues}
                fieldLabels={this.props.fieldLabels}
                merged={merged}
                fieldElement={this.props.fieldElement} />
        </div>);
    }
}

FluidMergedView.propTypes = {
    fieldValues: PropTypes.object,
    fieldLabels: PropTypes.object,
    value: PropTypes.array.isRequired,
    fieldElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
        PropTypes.object,
        PropTypes.func
    ])
};