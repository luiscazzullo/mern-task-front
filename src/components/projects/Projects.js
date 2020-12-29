import React, { useContext, useEffect } from 'react';
//Components
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask'
import TaskList from '../tasks/TaskList'
import AuthContext from '../../context/authentication/authContext';
const Projects = () => {
    const authContext = useContext(AuthContext);
    const { authUser } = authContext;
    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])
    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Header />
                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;