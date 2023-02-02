import React, {useEffect, createContext , useContext, useState} from "react";
import {AuthContext} from "../context/auth";
import { api, getPatientList } from "../services/api"
import { TrackerContext } from "../context/tracker";
import "./styles.css"
import { Navigate, useNavigate } from "react-router-dom";

const MenuPage = () => {

    const { authenticated, logout } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const navigate = useNavigate();




    

    const handleLogout = () => {
        logout()
    }

    const recoveredUser = localStorage.getItem('user');

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if(recoveredUser){
            setEmail(JSON.parse(recoveredUser).email);
        }

        setLoading(false);
    }, [] ); 

    const handleGoTrackMenu = () => {
        navigate("/eyeTrackerMenu")
    };
    
    const handleCreatePatient = () => {
    navigate("/createPatient")
    };



    return(
            <div className="menu">
            <h3 className="welcome">Você está logado(a) como: {email}</h3>

            <div className="actions">
                <button className="btn-menu" onClick={handleGoTrackMenu}>Opções de Captura</button>
                <button className="btn-menu" onClick={handleCreatePatient}>Criar novo paciente</button>
                <button className="btn-menu" onClick={handleLogout}>Fazer logout</button>
            </div>
           
            </div>

        
    );
}

export default MenuPage;