import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
const Header = () => {
    const authContext = useContext(AuthContext);
    const { authUser, user, logOff } = authContext;
    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])
    return ( 
        <header className="app-header">
            { user ? 
            <p className="nombre-usuario">Hola <span>{user.name}</span></p>
            : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logOff()}
                >Cerrar sesión
                </button>
            </nav>
        </header>
     );
}
 
export default Header;