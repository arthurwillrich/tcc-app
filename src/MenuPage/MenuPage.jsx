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

    const recoveredUser = localStorage.getItem('user');

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if (recoveredUser) {
          const emailParts = JSON.parse(recoveredUser).email.split('@');
          const emailWithoutDomain = emailParts[0];
          setEmail(emailWithoutDomain);
        }
        setLoading(false);
      }, []);
      


    return(
            <div className="menu">
            <h3 className="welcome">Você está logado(a) como: {email}</h3>

            <div className="actions">
                <button className="btn-menu" onClick={() => navigate('/patientMenu')}>Opções de Captura</button>
                <button className="btn-menu" onClick={() => navigate('/createPatient')}>Criar novo paciente</button>
                <button className="btn-menu" onClick={() => navigate('/uploadVideo')}>Enviar um vídeo</button>
                <button className="btn-menu" onClick={() => logout()}>Fazer logout</button>


            </div>
           
            </div>

        
    );
}

export default MenuPage;