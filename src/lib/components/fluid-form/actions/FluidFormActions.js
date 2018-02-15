import * as types from './';

export const resetForm = (form, payload) => {
    return {
        type: types.FORM_RESET,
        payload: { ...payload, form }
    };
}

export const setFormValue = (form, field, value) => {
    return {
        type: types.FORM_SET_FORM_VALUE,
        payload: {
            form,
            field,
            value
        }
    };
}

export const invalidForm = (form, field, message) => {
    return {
        type: types.FORM_INVALID,
        payload: {
            form,
            field,
            message
        }
    };
}