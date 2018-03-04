export default {
  environment: {
    dev: () => {
      const mockData = require('./MockData');
      return { mockData };
    },
    prod: new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          prodParam: 'hello'
        })
      }, 2000);
    })
  },
  catch: {
    componentError: (error, info) => { },
    apiError: (error) => { }
  }
};
