import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePatientPage = () => {

    const {createPatient} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [cpf_responsible, setCpfResponsible] = useState("");
    const [type, setType] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("created ", {name, cpf_responsible, type})
        createPatient(name, cpf_responsible, type)
    }

    const handleExit = () => {
        navigate("/menu")
    }
 
    
    return (

        
        <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Nome do Paciente</label>
                    <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>              
                <div className="field">
                    <label htmlFor="cpf_responsible">CPF do Responsável</label>
                    <input type="cpf_responsible" name="cpf_responsible" id="cpf_responsible" value={cpf_responsible} onChange={(e) => setCpfResponsible(e.target.value)}/>
                </div>
                <div>
                    <select id="type" onChange={(e) => setType(parseInt(e.target.value))} >
                        <option value="">Selecione...</option>
                        <option value="1" >Atípico</option>
                        <option value="2">Típico</option>
                        <option value="3">Não definido</option>
                    </select>
                </div>

                <div id="actions">
                    <button type="submit">Criar</button>
                    <button onClick={handleExit}>Sair</button>
                </div>
            </form>

        </div> 
    )
}

export default CreatePatientPage;