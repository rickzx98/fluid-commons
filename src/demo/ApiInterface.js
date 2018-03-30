import { FluidApi } from '../lib/';

export default {
  addPeople: {
    dev: ({ mockData }) => {
      FluidApi.storage('data', {
        value: {
          company: "Tellus Sem Mollis Institute",
          name: "Prescott"
        }
      }).then(({ data }) => {
        FluidApi.storage('data')
          .then(({ data }) => {
            console.log('result', data());
            FluidApi.storage('data', {
              field: 0, value: {
                company: "Tellus Sem Mollis Institute2",
                name: "Prescott"
              }
            }).then(({ data }) => {
              FluidApi.storage('data', {
                remove: 0
              }).then(({ data }) => {
                console.log('remove', data());
              });
            });
          });
      });
      console.log('dev-param', mockData());
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
