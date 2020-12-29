import { GET_TASKS,
         ADD_TASKS,
         VALIDATE_TASK,
         DELETE_TASK,
         ACTUAL_TASK,
         UPDATE_TASK,
         CLEAN_TASK } from '../../types';
export default (state, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasksprojects: action.payload
            }
        case ADD_TASKS:
            return {
                ...state,
                tasksprojects: [action.payload, ...state.tasksprojects],
                taskerror: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskerror: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksprojects: state.tasksprojects.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksprojects: state.tasksprojects.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                actualtask: action.payload
            }
        case CLEAN_TASK: 
            return {
                ...state,
                actualtask: null
            }
        default:
            return state;
    }
}