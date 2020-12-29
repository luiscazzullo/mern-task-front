import React from 'react';
//Components
import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList'
const Sidebar = () => {
    return ( 
        <aside>
            <h1>Mern <span>Task</span></h1>
            <NewProject />
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ProjectList />
            </div>
        </aside>
     );
}
 
export default Sidebar;