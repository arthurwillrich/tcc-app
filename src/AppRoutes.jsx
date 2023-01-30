import React, { useContext, useState } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import EyeTracker from './components/EyeTracker';
import LoginPage from "./LoginPage/LoginPage";
import Home from "./components/Home"

import { AuthProvider, AuthContext } from "./context/auth";

const AppRoutes = () => {

    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);
        
        if(loading){
            return <div className="loading">Carregando...</div>
        }

        if (!authenticated){
            return <Navigate to={"/login"} />;
        } 

        return children;
    }
    
    return(
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path='/login' element={<LoginPage/>}></Route>
                <Route exact path='/' element={<Private> <Home/> </Private>}></Route>
                <Route path='/eyeTracker' element={<EyeTracker/>}></Route>
            </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;