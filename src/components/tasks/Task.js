import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/project/projectContext';
const Task = ({ task }) => {
    const projectsContext = useContext(projectContext);
    const { actualproject } = projectsContext;
    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, updateTask, saveActualTask } = tasksContext;
    const [project] = actualproject;
    const removeTask = id => {
        deleteTask(id, project._id);
        getTasks(project.id);
    }
    const changeStatus = task => {
        if(task.status) {
            task.status = false;
        } else {
            task.status = true;
        }
        updateTask(task)
    }
    const selectActualTask = task => {
        saveActualTask(task);
    }
    return (  
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status 
                ? 
                (<button 
                    type="button" 
                    className="completo"
                    onClick={() => changeStatus(task)}
                >
                        Completo
                </button>)
                :
                (<button 
                    type="button" 
                    className="incompleto"
                    onClick={() => changeStatus(task)}
                >
                        Incompleto
                </button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => selectActualTask(task)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => removeTask(task._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Task;