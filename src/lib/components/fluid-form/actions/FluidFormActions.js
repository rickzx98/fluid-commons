import * as types from './';

export const submitForm = (form) => {
  return {
    type: types.FORM_SUBMITTED,
    payload: {
      form
    }
  };
};
export const resetForm = (form, payload) => {
  return {
    type: types.FORM_RESET,
    payload: { ...payload, form }
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

export const invalidForm = (form, field, message) => {
  return {
    type: types.FORM_INVALID,
    payload: {
      form,
      field,
      message
    }
  };
};

export const loadForm = (form, data)=>{
  return {
    type: types.FORM_LOAD_DATA,
    payload: {
      form, data
    }
  };
}
