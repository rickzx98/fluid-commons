import { FORM_INVALID, FORM_LOAD_DATA, FORM_RESET, FORM_SET_FORM_VALUE, FORM_SUBMITTED } from '../actions/';

import FluidFunc from 'fluid-func';

export default function FormReducer(state = {}, action) {
    switch (action.type) {
        case FORM_LOAD_DATA:
            {
                const { form, data } = action.payload;
                const newState = { ...state };
                const formState = {
                    ...newState[form], data: { ...data }, invalid: false, touched: false, managed: true,
                    errorFields: undefined,
                    message: undefined
                };
                newState[form] = formState;
                return newState;
            }
        case FORM_SUBMITTED:
            {
                const { form } = action.payload;
                const newState = { ...state };
                const formState = {
                    ...newState[form],
                    data: { ...newState[form].data },
                    touched: false,
                    invalid: false,
                    errorFields: undefined
                };
                newState[form] = formState;
                return newState;
            }
        case FORM_RESET:
            {
                const { form, payload, defaults } = action.payload;
                const newState = { ...state };
                newState[form] = { ...payload, data: { ...defaults } };
                return newState;
            }
        case FORM_INVALID:
            {
                const { form, errorFields } = action.payload;
                const newState = { ...state };
                const formState = { ...newState[form], errorFields, invalid: true };
                newState[form] = formState;
                return newState;
            }
        case FORM_SET_FORM_VALUE:
            {
                const { form, field, value } = action.payload;
                if (FluidFunc.exists(`${form}.${field}`)) {
                    FluidFunc.start(`${form}.${field}`, { value });
                }
                const newState = { ...state };
                const formState = {
                    ...newState[form],
                    data: { ...newState[form].data },
                    touched: true,
                    invalid: false,
                    field: undefined,
                    message: undefined
                };
                formState.data[field] = value;
                newState[form] = formState;
                return newState;
            }
        default:
            {
                return state;
            }
    }
}
