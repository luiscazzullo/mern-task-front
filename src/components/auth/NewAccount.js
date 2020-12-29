import React, { useState, useContext, useEffect } from 'react';
//Components
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';
const NewAccount = props => {
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;
    const authContext = useContext(AuthContext);
    const { message, auth, registerUser } = authContext;

    useEffect(() => {
        if(auth) {
            props.history.push('/proyectos');
        }
        if(message) {
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, auth, props.history])
//State
    //State to init sesion
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })
    const { name, email, password, confirm } = user;
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
        if(name.trim() === '' || 
           email.trim() === '' || 
           password.trim() === '' || 
           confirm.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(password.length < 6) {
            showAlert('El password debe tener al menos 6 caracteres', 'alerta-error');
            return
        }
        if(password !== confirm) {
            showAlert('Los passwords no son iguales', 'alerta-error');
            return;
        }
        registerUser({
            name,
            email,
            password
        })
    }
    return ( 
        <div className="form-usuario">
            { alert ? 
            (<div className={`alerta ${alert.category}`}>
                {alert.message}
            </div>)    
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crea una cuenta</h1>
                <form
                    onSubmit={handleOnSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu nombre"
                            onChange={handleOnChange}
                            value={name}
                        />
                    </div>
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
                        <label htmlFor="password">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Su contraseña"
                            onChange={handleOnChange}
                            value={confirm}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Registrarme"
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
 
export default NewAccount;