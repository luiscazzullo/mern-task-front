import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer'
//Types
import { FORM_PROJECT,
         GET_PROJECTS,
         ADD_PROJECT,
         VALIDATE_FORM,
         ACTUAL_PROJECT,
         DELETE_PROJECT,
         ERROR_PROJECT } from '../../types';
import clientAxios from '../../config/axios';

const ProjectState = props => {
    const initialState = {
        form: false,
        projects: [],
        formerror: false,
        actualproject: null,
        message: null
    }
    const [state, dispatch] = useReducer(projectReducer, initialState);
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    const getProjects = async () => {
        try {
            const results = await clientAxios.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: results.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }
    const addProject = async project => {
        try {
            const result = await clientAxios.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }
    const getActualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
        }
    }
 
    return (
        <projectContext.Provider
            value={{
                form: state.form,
                projects: state.projects,
                formerror: state.formerror,
                actualproject: state.actualproject,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                getActualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
export default ProjectState;