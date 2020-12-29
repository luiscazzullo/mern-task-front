import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';
//Components
import { Link } from 'react-router-dom'
const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    const authContext = useContext(AuthContext);
    const { message, auth, logUser } = authContext;
    useEffect(() => {
/*         if(auth) {
            props.history.push('/proyectos');
        } */
        if(message) {
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, auth, props.history])
//State
    //State to init sesion
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;
//Functions
    //Function to handle on change event
    const handleOnChange = ev => {
        setUser({
            ...user,
            [ev.target.name] : ev.target.value
        })
    }
    const handleOnSubmit = ev => {
        ev.preventDefault();
        if(email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        logUser({ email, password })
    }
    return ( 
        <div className="form-usuario">
            { alert ? 
            (<div className={`alerta ${alert.category}`}>
                {alert.message}
            </div>)    
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form
                    onSubmit={handleOnSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={handleOnChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Su contraseña"
                            onChange={handleOnChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">
                    Crear cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;