import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/tasks/taskContext';
const FormTask = () => {
    const projectsContext = useContext(projectContext);
    const tasksContext = useContext(taskContext);
    const { taskerror, actualtask, addTasks, validateTask, getTasks, updateTask, cleanTask } = tasksContext;
    const { actualproject } = projectsContext;
    const [task, setTask] = useState({
        name: ''
    })
    useEffect(() => {
        if(actualtask !== null) {
            setTask(actualtask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [actualtask])
    const { name } = task;
    if(!actualproject) return null;
    const [project] = actualproject;
    const handleOnChange = ev => {
        setTask({
            ...task,
            [ev.target.name] : ev.target.value
        })
    }

    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(name.trim() === '') {
            validateTask();
            return;
        }
        if(actualtask === null) {
            task.project = project._id;
            addTasks(task);
        } else {
            updateTask(task)
            cleanTask();
        }
        getTasks(project.id);
        setTask({
            name: ''
        })
    }
    return ( 
        <div className="formulario">
            <form
                onSubmit={handleOnSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario btn-submit"
                        value={actualtask ? "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>
            {taskerror ? <p className="mensaje error">Añada un nombre a su tarea</p> : null}
        </div>
    );
}
 
export default FormTask;