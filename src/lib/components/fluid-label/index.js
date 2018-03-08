import PropTypes from 'prop-types';
import React from 'react';

let FluidLabelConfig = {};
export class FluidLabel extends React.Component {
    static get(name, locale, label) {
        return FluidLabelConfig[name][locale][label];
    }
    static setup(name, config) {
        FluidLabelConfig[name] = config;
    }
    constructor(props) {
        super(props);
        this.state = { label: '', error: false };
    }
    componentWillMount() {
        this.refreshLabel();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.locale !== nextProps.locale) {
            this.refreshLabel();
        }
    }
    refreshLabel() {
        if (FluidLabelConfig[this.props.name][this.props.locale][this.props.label]) {
            this.setState({ label: FluidLabelConfig[this.props.name][this.props.locale][this.props.label], error: false });
        } else {
            this.setState({ label: `<!--${this.props.label} label is not localized-->`, error: true })
        }
    }
    render() {
        return (<span className={`fluid-label ${this.state.error ? 'error' : ''}`}>{this.state.label}</span>)
    }
}

FluidLabel.propTypes = {
    locale: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};