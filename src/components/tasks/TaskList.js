import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//Context
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/tasks/taskContext';
//Components
import Task from '../tasks/Task'
const TaskList = () => {
    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);
    const { actualproject, deleteProject } = projectsContext;
    const { tasksprojects } = tasksContext;
    if (!actualproject) return <h2>Selecciona un proyecto</h2>
    const [project] = actualproject;
    return ( 
        <>
            <h2>Proyecto: {project.name} </h2>
            <ul className="listado-tareas">
                {tasksprojects.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : (<TransitionGroup>
                        {tasksprojects.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Task
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>)
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(project._id)}
            >Eliminar Proyecto &times;</button>
        </>
    );
}
 
export default TaskList;