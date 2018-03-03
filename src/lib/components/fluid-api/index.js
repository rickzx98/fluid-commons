import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';
const FluidName = '_$$FluidFunc_$$FluidApi_';
const EFluidApi = `${FluidName}_e$`;
export class FluidApi extends React.Component {
  static execute(api, param) {
    FluidFunc.start(FluidName, { api, param });
  }
  constructor(props) {
    super(props);
    this.onCreate();
    this.thisExecute = this.execute.bind(this);
    if (FluidFunc.exists(FluidName)) {
      throw new Error('Only one instance of FluidApi is allowed');
    } else {
      FluidFunc.create(FluidName)
        .onStart(this.thisExecute)
        .spec('api', { require: true });
    }
  }
  componentDidCatch(error, info) {
    const config = this.props.config;
    if (config && config.catch && config.componentError) {
      config.componentError(error, info);
    }
  }
  onCreate() {
    const config = this.props.config;
    if (config && config.environment) {
      this.defaultParam = config.environment[this.props.environment] instanceof Function ? config.environment[this.props.environment]() : config.environment[this.props.environment];
    }
    for (let apiName in this.props.api) {
      if (this.props.api.hasOwnProperty(apiName)) {
        FluidFunc.create(`${EFluidApi}${apiName}`)
          .onStart(this.props.api[apiName][this.props.environment]);
      }
    }
  }
  execute({ api, param }) {
    return new Promise((resolve, reject) => {
      FluidFunc.start(`${EFluidApi}${api()}`, { ...this.defaultParam, ...param() })
        .then(result => {
          resolve({ result });
        })
        .catch(error => {
          const config = this.props.config;
          if (config && config.catch && config.catch.apiError) {
            config.catch.apiError(error);
          }
          reject(error);
        });
    });
  }
  render() {
    return (<span>{this.props.children}</span>);
  }
}
FluidApi.propTypes = {
  environment: PropTypes.string.isRequired,
  config: PropTypes.object,
  api: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};
