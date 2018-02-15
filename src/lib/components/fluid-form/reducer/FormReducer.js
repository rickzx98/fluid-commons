import { FORM_INVALID, FORM_RESET, FORM_SET_FORM_VALUE } from '../actions/';

export default function FormReducer(state = {}, action) {
    switch (action.type) {
        case FORM_RESET: {
            const { form, payload } = action.payload;
            const newState = { ...state };
            newState[form] = payload;
            return newState;
        }
        case FORM_INVALID: {
            const { form, field, message } = action.payload;
            const newState = { ...state };
            const formState = { ...newState[form], field, message };
            newState[form] = formState;
            return newState;
        }
        case FORM_SET_FORM_VALUE: {
            const { form, field, value } = action.payload;
            const newState = { ...state };
            const formState = { ...newState[form] };
            formState[field] = value;
            newState[form] = formState;
            return newState;
        }
    }
}