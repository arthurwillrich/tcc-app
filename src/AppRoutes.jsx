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
import MenuPage from "./MenuPage/MenuPage";
import EyeTrackerMenuPage from "./EyeTrackerMenuPage/EyeTrackerMenuPage";

import { AuthProvider, AuthContext } from "./context/auth";
import CreateUserPage from "./CreateUserPage/CreateUserPage";
import CreatePatientPage from "./CreatePatientPage/CreatePatientPage";

const AppRoutes = () => {

    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);
        console.log(`auth: ${authenticated}`)
        
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
                <Route exact path='/createUser' element={<CreateUserPage/>}></Route>
                <Route exact path='/' element={<Private> <Home/> </Private>}></Route>
                <Route exact path='/menu' element={<Private><MenuPage/></Private>}></Route>
                <Route path='/eyeTracker' element={<Private><EyeTracker/></Private>}></Route>
                <Route path='/eyeTrackerMenu' element={<Private><EyeTrackerMenuPage/></Private>}></Route>
                <Route path='/createPatient' element={<Private><CreatePatientPage/></Private>}></Route>


            </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;