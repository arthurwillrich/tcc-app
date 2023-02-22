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
    const [cpf_responsible, setCpf] = useState();
    const [list, setPatientList] = useState([]);
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const [myArray, setMyArray] = useState([]);

    var cpfList = [];

    const Patients = [
        { value: 0, label: "Film & Animation" },
        { value: 0, label: "Autos & Vehicles" },
        { value: 0, label: "Music" },
        { value: 0, label: "Pets & Animals" },
        { value: 0, label: "Sports" },
    ]
    var Patientsobjct = [
    ]



    const loadData = async () => {
        const response  = await getPatientList();
        console.log("teste1")
        for (var i = 0; i < response.data.length; i++){
            cpfList.push(response.data[i].cpf_responsible)
            console.log("ISSO", {cpf:response.data[i].cpf_responsible})
            console.log("DEONTRODISSO?",Patientsobjct)
            if (!Patientsobjct.includes({cpf:response.data[i].cpf_responsible})){
                console.log("NAO")
                console.log("ANTESDEPOR", Patientsobjct)
                Patientsobjct.push({cpf:response.data[i].cpf_responsible})
                console.log("DPS", Patientsobjct)

            }
        }
        // console.log("dentro objecto paciente", Patientsobjct)
        setMyArray(Patientsobjct)
        // console.log("Meuarray", myArray)
        // setCpfList(cpfList)
        // console.log(response.data)
        // console.log("cpflist", cpfList)
        // setPatientList(response.data)
        // console.log(list)

        const uniqueObjects = [...new Map(myArray.map(item => [item.cpf, item])).values()]
        // console.log("UNICO", uniqueObjects)
    }

    useEffect(() => {
        (async () => await loadData())()
        // loadData();
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
            var tempCpf = list[i].cpf_responsible;
            console.log(tempCpf)
            // cpfList.push(tempCpf);
            console.log(`cpfList: ${cpfList}`)

         }
    }


    const handleSubmit = (e) => {
        loadCpfList()
        e.preventDefault()

        console.log(`cpfList ${cpfList} include cpf ${cpf_responsible} `)
        if (cpfList.includes(cpf_responsible)){
            console.log("sim")
            navigate("/eyeTracker")

        } else {
            console.log(`{nao ${cpf_responsible} e ${list}`)
        }
      };

      useEffect(() => {
        localStorage.setItem('cpf_responsible', JSON.stringify(cpf_responsible));
      }, [cpf_responsible]);

      const handleChangeTwo = (event) => {
        console.log(event.currentTarget.value)
    }
      
    // console.log("Meuarray22", myArray)

    return(
            <div className="init-eyetracker">
            <h1>Você está logado(a) como: {email}</h1>
           <h2>Digite o cpf do paciente que fará a coleta: </h2>

           
           <form className="form" onSubmit={handleSubmit}>
           <div className="field">
                    <label htmlFor="cpf_responsible"></label>
                    <input type="cpf_responsible" name="cpf_responsible" id="cpf_responsible" value={cpf_responsible} onChange={(e) => setCpf(e.target.value)}/>
            </div>   
            <div id="actions">

            <div className="selectcpf">
                <select onChange={handleChangeTwo}>
                    {Patients.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
            </select>
            </div>
    
            <button type="submit">Iniciar</button>   
            <button className="logout" onClick={handleLogout}>Sair</button>
            </div>
            </form>
            </div>

        
    );
}

export default EyeTrackerMenuPage;