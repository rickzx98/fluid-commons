import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

const FluidName = '_$$FluidFunc_$$FluidApi_';
const StorageName = '_$$ss_';
const EFluidApi = `${FluidName}_e$`;
const subscribers = {};
function notifySubscriber(param, callback) {
  return new Promise((resolve, reject) => {
    try {
      const action = callback(param);
      if (action instanceof Promise) {
        action.then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      } else {
        resolve();
      }
    } catch (err) {
      reject(err);
    }
  });
}
export class FluidApi extends React.Component {
  static storage(context, action) {
    return FluidFunc.start(`${FluidName}${StorageName}`, {
      context,
      action
    });
  }

  static execute(api, param) {
    return FluidFunc.start(FluidName, { api, param });
  }

  static subscribe(target, callback) {
    if (subscribers[target]) {
      const targetSubcribers = subscribers[target];
      FluidFunc.create(`_target_${target}_${targetSubcribers.length}`)
        .onStart(param => {
          return notifySubscriber(param, callback);
        })
        .strict()
        .spec("target", { require: true })
        .spec("message", { require: true });
      targetSubcribers.push(`_target_${target}_${targetSubcribers.length}`);
    } else {
      subscribers[target] = [`_target_${target}_0`];
      FluidFunc.create(`_target_${target}_0`).onStart(param => {
        return notifySubscriber(param, callback);
      })
        .strict()
        .spec("target", { require: true })
        .spec("message", { require: true });
    }
  }

  static notify(target, message) {
    if (subscribers[target]) {
      return FluidFunc.start(subscribers[target], {
        target,
        message
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.onCreate();
    this.thisExecute = this.execute.bind(this);
    this.thisFetchStorage = this.fetchStorage.bind(this);
    if (FluidFunc.exists(FluidName)) {
      throw new Error('Only one instance of FluidApi is allowed');
    } else {
      FluidFunc.create(FluidName)
        .onStart(this.thisExecute)
        .spec('api', { require: true });
      FluidFunc.create(`${FluidName}${StorageName}`)
        .onStart(this.thisFetchStorage)
        .spec('context', { require: true })
        .spec('action');
    }
  }
  componentDidCatch(error, info) {
    const config = this.props.config;
    if (config && config.catch && config.componentError) {
      config.componentError(error, info);
    }
  }
  fetchStorage({ context, action }) {
    const ctx = this.storage[context()];
    let field, value, remove;
    if (action) {
      field = action('field');
      value = action('value');
      remove = action('remove')
    }
    const isArray = ctx instanceof Array;
    let ctxClone = {};
    if (isArray) {
      ctxClone = [...ctx];
    } else {
      ctxClone = { ...ctx };
    }

    let result = ctxClone;

    if (field !== undefined) {
      if (value) {
        ctxClone[field] = value;
        this.storage[context()] = ctxClone;
      } else {
        result = ctxClone[field];
      }
    } else {
      if (value && isArray) {
        ctxClone.push(value);
        this.storage[context()] = ctxClone;
      }
      if (remove !== undefined && isArray) {
        ctxClone.splice(remove, 1);
        this.storage[context()] = ctxClone;
      } else if (remove !== undefined) {
        delete ctxClone[remove];
        this.storage[context()] = ctxClone;
      }
      result = ctxClone;
    }

    return { data: result };
  }
  handleStorage() {
    const config = this.props.config;
    if (config && config.storage) {
      const store = config.storage[this.props.environment] instanceof Function ? config.storage[this.props.environment]() : config.storage[this.props.environment];
      if (store instanceof Promise) {
        this.setState({ loading: true });
        store.then((data) => {
          this.setState({ loading: false });
          this.storage = data;
        }).catch(error => {
          if (config.componentError) {
            config.componentError(error);
          } else {
            console.error(error);
          }
          this.setState({ loading: false });
        });
      } else {
        this.storage = store;
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
