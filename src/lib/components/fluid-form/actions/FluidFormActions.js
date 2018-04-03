import * as types from './';

export const submitForm = (form) => {
  return {
    type: types.FORM_SUBMITTED,
    payload: {
      form
    }
  };
};
export const resetForm = (form, payload, defaults) => {
  return {
    type: types.FORM_RESET,
    payload: { ...payload, form, defaults }
  };
};

export const setFormValue = (form, field, value) => {
  return {
    type: types.FORM_SET_FORM_VALUE,
    payload: {
      form,
      field,
      value
    }
  };
};

export const invalidForm = (form, errorFields) => {
  return {
    type: types.FORM_INVALID,
    payload: {
      form,
      errorFields
    }
  };
};

export const loadForm = (form, data) => {
  return {
    type: types.FORM_LOAD_DATA,
    payload: {
      form, data
    }
  };
};

export const initFieldData = (form, spec) => {
  return {
    type: types.FORM_INIT_FIELD_DATA,
    payload: {
      form, spec
    }
  };
};