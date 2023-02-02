import React, { useEffect, useState, createContext } from "react"

import { useNavigate } from "react-router-dom";

export const TrackerContext = createContext();

export const TrackerProvider = ({children}) => {

    const navigate = useNavigate();
    const [patient, setPatient] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const recoveredPatient = localStorage.getItem('cpf');
        if(recoveredPatient){
            setPatient(JSON.parse(recoveredPatient));
        }

        setLoading(false);
    }, [] );

    const goTrack = (cpf) => {
        console.log(cpf)
        navigate("/eyeTracker")
    }

    return(
        <TrackerContext.Provider value={goTrack}>
            {children}
        </TrackerContext.Provider>

    )
    
}

