import React, { useContext, useEffect } from 'react';
import ProjectCard from './ProjectCard';
//Context
import projectContext from '../../context/project/projectContext';
import AlertContext from '../../context/alerts/alertContext';
const ProjectList = () => {
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    useEffect(() => {
        if(message) {
            showAlert(message.msg, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message]);
    if(projects.length === 0) return <p>No hay proyectos, añade uno</p>;
    return ( 
        <ul className="listado-proyectos">
            { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null}
            {projects.map(project => (
                <ProjectCard 
                    key={project._id}
                    project={project}
                />
            ))}
        </ul>
     );
}
 
export default ProjectList