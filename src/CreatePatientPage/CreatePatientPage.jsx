import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatePatientPage = () => {

    const {createPatient} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [cpf_responsible, setCpfResponsible] = useState("");
    const [type, setType] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("created ", {name, cpf_responsible, type});
        createPatient(name, cpf_responsible, type)
        .then(() => {
            toast.success('Paciente criado com sucesso!', {autoClose: 2000});
            setTimeout(() => navigate('/menu'), 2000);
          })
          .catch(() => {
            toast.error('Falha ao criar paciente. Tente novamente mais tarde.');
          });
    };
 
    
    return (

        
        <div className="create">
            <ToastContainer />
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
                        <option value="0" >Atípico</option>
                        <option value="1">Típico</option>
                        <option value="2">Não definido</option>
                    </select>
                </div>

                <div id="actions">
                    <button type="submit">Criar</button>
                    <button onClick={() => navigate('/menu')}>Retornar ao Menu</button>
                </div>
            </form>

        </div> 
    )
}

export default CreatePatientPage;