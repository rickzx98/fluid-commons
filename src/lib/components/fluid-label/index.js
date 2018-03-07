import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

export class FluidLabel extends React.Component {
    static setup(name, config) {
        FluidFunc.create(`__${name}_$$config`)
            .onStart(({ locale, label }) => {
                if (config[locale()]) {
                    return config[locale()][label()];
                } else {
                    throw new Error(`Label ${locale()} doesn't exist`);
                }
            })
            .spec('locale', { require: true })
            .spec('label', { require: true });
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
        if (FluidFunc.exists(`__${this.props.name}_$$config`)) {
            FluidFunc.start(`__${this.props.name}_$$config`, {
                label: this.props.label,
                locale: this.props.locale
            }).then(result => {
                console.log('result', result);
                if (result.value) {
                    this.setState({ label: result.value(), error: false });
                }
                else {
                    this.setState({ label: `<!--${this.props.label} label is not localized-->`, error: true })
                }
            }).catch(error => { throw new Error(error) });
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