import React, { useEffect, createContext, useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { api, getPatientList } from "../services/api";
import { TrackerContext } from "../context/tracker";
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";

const EyeTrackerMenuPage = () => {
  const { authenticated, logout, eyeTracker } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cpf_responsible, setCpf] = useState();
  const [list, setPatientList] = useState([]);
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [myArray, setMyArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  var cpfList = [];
  var Patientsobjct = [];

  const loadData = async () => {
    const response = await getPatientList();
    for (var i = 0; i < response.data.length; i++) {
      const { cpf_responsible, name } = response.data[i];
      cpfList.push(cpf_responsible);
      if (!Patientsobjct.some((item) => item.cpf === cpf_responsible)) {
        Patientsobjct.push({ cpf: cpf_responsible, name: name });
      }
    }
    setMyArray(Patientsobjct);
    const uniqueObjects = [
      ...new Map(myArray.map((item) => [item.cpf, item])).values(),
    ];
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const recoveredUser = localStorage.getItem("user");

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setEmail(JSON.parse(recoveredUser).email);
    }

    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedOption)
    //navigate("/eyeTracker");

  };

  useEffect(() => {
    localStorage.setItem("cpf_responsible", JSON.stringify(cpf_responsible));
  }, [cpf_responsible]);


  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };


    return(
        <div className="init-eyetracker">
            <h1>Você está logado(a) como: {email}</h1>

            <p>Selecione paciente que fará a coleta: </p>

            <div id="actions">

            {myArray.length > 0 && (
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                </tr>
                </thead>
                <tbody>
                {myArray.map((patient) => (
                <tr
                    key={patient.cpf}
                    onClick={() => handleSelectOption(patient)}
                    className={selectedOption === patient ? "selected" : ""}
                >
                    <td>{patient.name}</td>
                    <td>{patient.cpf}</td>
                </tr>
                ))}
                </tbody>
            </table>
            )}


    
            <button type="submit" onClick={handleSubmit}>Iniciar</button>   
            <button className="logout" onClick={handleLogout}>Sair</button>
            </div>
            </div>

        
    );
}

export default EyeTrackerMenuPage;