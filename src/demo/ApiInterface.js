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
            FluidApi.storage('obj', { field: 'name', value: 'Jeric' })
              .then(({ data }) => {
                FluidApi.storage('obj')
                  .then(({ data }) => {
                    console.log('obj', data());
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
