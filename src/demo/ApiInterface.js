import { FluidApi } from '../lib/';

export default {
  addPeople: {
    dev: ({ mockData }) => {
      console.log('storage', FluidApi.storage());
      FluidApi.storage().data.push({
        company: "Tellus Sem Mollis Institute",
        name: "Prescott"
      });
      console.log('storage', FluidApi.storage());
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
