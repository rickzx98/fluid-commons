export default {
  addPeople: {
    dev: (param) => {
      console.log('dev-param', param.mockData());
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ value: 'dev' });
        }, 800);
      });
    },
    prod: (param) => {
      console.log('prod-param', param.prodParam());
    }
  }
};
