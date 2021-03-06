import { FORM_PROJECT, 
        GET_PROJECTS, 
        ADD_PROJECT, 
        VALIDATE_FORM,
        ACTUAL_PROJECT,
        DELETE_PROJECT,
        ERROR_PROJECT } from '../../types';
export default (state, action) => {
    switch(action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formerror: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                formerror: true
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                actualproject: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                actualproject: null
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}