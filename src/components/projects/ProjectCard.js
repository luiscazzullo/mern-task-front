import React, { useContext } from 'react';
import projectContext from '../../context/project/projectContext';
import taskContext from '../../context/tasks/taskContext';
const ProjectCard = ({ project }) => {
    const projectsContext = useContext(projectContext);
    const { getActualProject } = projectsContext;
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;
    const selectProject = id => {
        getActualProject(id);
        getTasks(id)
    }
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >{project.name}</button>
        </li>
    );
}
 
export default ProjectCard;