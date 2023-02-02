import React, { useEffect, useState, createContext } from "react"

import { useNavigate } from "react-router-dom";
import { api, createSession, createUserApi, createPatientApi } from "../services/api"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    
    useEffect(() => {

        const recoveredUser = localStorage.getItem('user');
        console.log("1")
        if(recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, [] );

    const login = async (email, password) => {
        console.log("teste")
        const response = await createSession(email, password);
        console.log("login", response.data);
        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser))
        localStorage.setItem("token", token)

        api.defaults.headers.Authorization = `Bearer ${token}`

        setUser(loggedUser)
        navigate("/menu");

    };
    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cpf")

        api.defaults.headers.Authorization  = null;
        setUser(null);
        navigate("/login");
        window.location.reload();

    };

    const createPatient = async (name, cpf_patient, atipical) => {
        console.log("3")

        const response = await createPatientApi(name, cpf_patient, atipical);
    }

    const createUser = async (email, password) => {
        console.log("2")
        navigate("/login");
        const response = await createUserApi(email, password);

    }

    return(
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout, createUser, createPatient}}>
            {console.log("4")}
            {children}
        </AuthContext.Provider>

    )
}