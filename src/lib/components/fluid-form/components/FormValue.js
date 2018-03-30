import FluidValue from '../../types/FluidValue';

function getDataFromParam(specs, param) {
    let data = {};
    if (specs) {
        specs.forEach(spec => {
            if (param[spec.field]) {
                data[spec.field] = param[spec.field]();
            }
        });
    }
    return data;
}
export default class FormValue extends FluidValue {
    constructor(specs, value){
        super(specs, getDataFromParam(specs, value));
        this.getRawValue = ()=> getDataFromParam(specs, value);
    }
   
 }