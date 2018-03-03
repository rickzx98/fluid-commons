export default {
  environment: {
    dev: {
      mockData: require('./MockData')
    },
    prod: {
      sampleParam: 'hello'
    }
  },
  catch: {
    componentError: (error, info) => { },
    apiError: (error) => { }
  }
};
