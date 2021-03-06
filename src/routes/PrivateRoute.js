import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authentication/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    const authContext = useContext(AuthContext);
    const { auth, loading, authUser} = authContext;
    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])
    return ( 
        <Route 
            {...props}
            render={ props => !auth && !loading ? 
            (<Redirect to='/login' />)
            : (<Component {...props} />)
            }
        />
     );
}
 
export default PrivateRoute;