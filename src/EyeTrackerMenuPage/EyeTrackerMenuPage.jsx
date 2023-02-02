import React, {useEffect, createContext , useContext, useState} from "react";
import {AuthContext} from "../context/auth";
import { api, getPatientList } from "../services/api"
import { TrackerContext } from "../context/tracker";
import "./styles.css"
import { Navigate, useNavigate } from "react-router-dom";

const EyeTrackerMenuPage = () => {

    const { authenticated, logout, eyeTracker } = useContext(AuthContext)
    // const { goTrack } = useContext(TrackerContext)
    const [loading, setLoading] = useState(true);
    const [cpf, setCpf] = useState();
    const [list, setPatientList] = useState([]);
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    var cpfList = [];



    const loadData = async () => {
        const response  = await getPatientList();
        setPatientList(response.data)
    }

    useEffect(() => {
        (async () => await loadData())()
        loadData();
    }, []);
    

    const handleLogout = () => {
        logout();
    }

    const recoveredUser = localStorage.getItem('user');

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if(recoveredUser){
            setEmail(JSON.parse(recoveredUser).email);
        }

        setLoading(false);
    }, [] ); 

    const loadCpfList = async () => {
        for (var i = 0;; i++) {

            
            if (i > list.length) break;
            var tempCpf = list[i].cpf;
            console.log(tempCpf)
            cpfList.push(tempCpf);
            console.log(`cpfList: ${cpfList}`)

         }
    }
    const handleSubmit = (e) => {

        loadCpfList();
        e.preventDefault()

        console.log(`cpfList ${cpfList} include cpf ${cpf} `)
        if (cpfList.includes(cpf)){
            console.log("sim")
            navigate("/eyeTracker")

        } else {
            console.log(`{nao ${cpf} e ${list}`)
        }
      };

      useEffect(() => {
        localStorage.setItem('cpf', JSON.stringify(cpf));
      }, [cpf]);
      

    return(
            <div className="init-eyetracker">
            <h1>Você está logado(a) como: {email}</h1>
           <h2>Digite o cpf do paciente que fará a coleta: </h2>

           
           <form className="form" onSubmit={handleSubmit}>
           <div className="field">
                    <label htmlFor="cpf"></label>
                    <input type="cpf" name="cpf" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
            </div>   
            <div id="actions">
    
            <button type="submit">Iniciar</button>   
            <button className="logout" onClick={handleLogout}>Sair</button>
            </div>
            </form>
            </div>

        
    );
}

export default EyeTrackerMenuPage;