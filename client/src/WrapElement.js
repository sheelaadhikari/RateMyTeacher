import React from 'react'
import { useAuth } from './context/auth'
import { Navigate } from 'react-router-dom';


const WrapElement = ({ children }) => {
    const [auth, setAuth] = useAuth();
    console.log(auth)

    let toShow = children;

    if (auth.token && auth.user.role === 0) {
        toShow = children
    } else {
        toShow = <Navigate to='/' replace />
    }



    return (
        toShow
    )
}

export default WrapElement