export default {
  environment: {
    dev: () => {
      const mockData = require('./MockData');
      return { mockData };
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
