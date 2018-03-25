import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

const FluidName = '_$$FluidFunc_$$FluidApi_';
const EFluidApi = `${FluidName}_e$`;
let storage = {};
export class FluidApi extends React.Component {
  static storage() {
    return storage;
  }
  static execute(api, param) {
    return FluidFunc.start(FluidName, { api, param });
  }
  constructor(props) {
    super(props);
    this.state = { loading: false };
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
  handleStorage() {
    const config = this.props.config;
    if (config && config.storage) {
      const store = config.storage[this.props.environment] instanceof Function ? config.storage[this.props.environment]() : config.storage[this.props.environment];
      if (store instanceof Promise) {
        this.setState({ loading: true });
        store.then((data) => {
          this.setState({ loading: false });
          storage = data;
        }).catch(error => {
          if (config.componentError) {
            config.componentError(error);
          } else {
            console.error(error);
          }
          this.setState({ loading: false });
        });
      } else {
        storage = store;
      }
    }
  }
  handleDefaultParam() {
    const config = this.props.config;
    if (config && config.environment) {
      this.defaultParam = config.environment[this.props.environment] instanceof Function ? config.environment[this.props.environment]() : config.environment[this.props.environment];
    }
  }
  onCreate() {
    this.handleStorage();
    this.handleDefaultParam();
    for (let apiName in this.props.api) {
      if (this.props.api.hasOwnProperty(apiName)) {
        FluidFunc.create(`${EFluidApi}${apiName}`)
          .onStart(this.props.api[apiName][this.props.environment]);
      }
    }
  }
  execute({ api, param }) {
    return new Promise((resolve, reject) => {
      this.getDefaultParam((defaultParam) => {
        FluidFunc.start(`${EFluidApi}${api()}`, { ...defaultParam, ...param() })
          .then(result => {
            const resultObject = {};
            resultObject[api()] = result;
            resolve(resultObject);
          })
          .catch(error => {
            const config = this.props.config;
            if (config && config.catch && config.catch.apiError) {
              config.catch.apiError(error);
            }
            reject(error);
          });
      });
    });
  }
  getDefaultParam(callback) {
    if (this.defaultParam) {
      if (this.defaultParam instanceof Promise) {
        this.defaultParam.then(result => {
          callback(result);
        }).catch((error) => {
          callback()
        });
      } else {
        callback(this.defaultParam);
      }
    } else {
      callback({});
    }
  }
  render() {
    return (<span>{!this.state.loading && this.props.children}</span>);
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
