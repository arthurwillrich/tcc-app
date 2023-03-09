import React, { useContext, useState } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import EyeTracker from './EyeTracker/EyeTracker';
import LoginPage from "./LoginPage/LoginPage";
import Home from "./components/Home"
import MenuPage from "./MenuPage/MenuPage";

import { AuthProvider, AuthContext } from "./context/auth";
import CreateUserPage from "./CreateUserPage/CreateUserPage";
import CreatePatientPage from "./CreatePatientPage/CreatePatientPage";
import UploadVideoPage from "./UploadVideoPage/UploadVideoPage";
import Video from "./SelectVideo/Video";
import CalibratePage from "./CalibratePage/CalibratePage";
import PatientMenuPage from "./PatientMenuPage/PatientMenuPage";
import EyeTrackerMenuPage from "./EyeTrackerMenuPage/EyeTrackerMenuPage";
import SelectVideoPage from "./SelectVideo/SelectVideoPage";
import CalibratePageTest from "./CalibratePage/CalibratePageTest";

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

                <Route exact path='/video' element={<Video/>}></Route>
                <Route exact path='/createUser' element={<CreateUserPage/>}></Route>
                <Route exact path='/' element={<Private> <Home/> </Private>}></Route>
                <Route exact path='/menu' element={<Private><MenuPage/></Private>}></Route>
                <Route path='/eyeTracker' element={<Private><EyeTracker/></Private>}></Route>
                <Route path='/patientMenu' element={<Private><PatientMenuPage/></Private>}></Route>
                <Route path='/createPatient' element={<Private><CreatePatientPage/></Private>}></Route>
                <Route path='/uploadVideo' element={<Private><UploadVideoPage/></Private>}></Route>
                <Route path='/calibrate' element={<Private><CalibratePageTest/></Private>}></Route>
                <Route path='/eyeTrackerMenu' element={<Private><EyeTrackerMenuPage/></Private>}></Route>
                <Route path='/selectVideo' element={<Private><SelectVideoPage/></Private>}></Route>






            </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes;