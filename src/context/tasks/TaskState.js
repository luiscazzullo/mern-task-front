import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import clientAxios from '../../config/axios';
//Types
import { GET_TASKS,
         ADD_TASKS,
         VALIDATE_TASK, 
         DELETE_TASK,
         ACTUAL_TASK,
         UPDATE_TASK,
         CLEAN_TASK } from '../../types';

const TaskState = props => {
    const initialState = {
        tasksprojects: [],
        taskerror: false,
        actualtask: null
    }
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const getTasks = async project => {
        try {
            const results = await clientAxios.get('/api/tasks', { params : { project }});
            dispatch({
                type: GET_TASKS,
                payload: results.data.tasks
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    const addTasks = async task => {
        try {
            const results = await clientAxios.post('/api/tasks', task);
            // eslint-disable-next-line
            dispatch({
                type: ADD_TASKS,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }
    const deleteTask = async (id, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${id}`, { params: { project }});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }
    const saveActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }
    const updateTask = async task => {
        try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }
    return (
        <TaskContext.Provider
            value={{
                tasksprojects: state.tasksprojects,
                taskerror: state.taskerror,
                actualtask: state.actualtask,
                getTasks,
                addTasks,
                validateTask,
                deleteTask,
                saveActualTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskState;