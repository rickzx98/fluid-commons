export default {
  addPeople: {
    dev: (param) => {
      console.log('dev-param', param);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 800);
      });
    },
    prod: (param) => {
      console.log('prod-param', param);
    }
  }
};
