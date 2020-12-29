import React, { useState, useContext } from 'react';
import projectContext from '../../context/project/projectContext';
const NewProject = () => {
    const projectsContext = useContext(projectContext);
    const { form, formerror, showForm, addProject, showError } = projectsContext;
    const [project, setProject] = useState({
        name: ''
    })
    const { name } = project;
    const handleOnChange = ev => {
        setProject({
            ...project,
            [ev.target.name]: ev.target.value
        })
    }
    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(name === '') {
            showError();
            return;
        }
        addProject(project);
        setProject({
            name: ''
        })
    }
    return ( 
        <>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={() => showForm()}
            >
                Nuevo proyecto
            </button>
            { form ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleOnSubmit}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre proyecto"
                            name="name"
                            onChange={handleOnChange}
                            value={name}
                        />
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Añadir proyecto"
                        />
                    </form>
                ) : null
            }
            { formerror ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </>
     );
}
 
export default NewProject;