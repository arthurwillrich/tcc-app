import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

import "./styles.css"    



const CreateUserPage = () => {
    
    const {createUser} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("create  ", {email, password})

        createUser(email, password) // context integration
    }

    // const loadData = async () => {
    //     const response  = await getPatientList();
    //     setPatientList(response.data)
    // }

    const handleExit = () => {
        navigate("/login")
    }
    return (
        <div className="create">
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div className="field">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div id="actions">
                    <button type="submit">Criar</button>
                    <button onClick={handleExit}>Sair</button>
                </div>
            </form>

        </div>
 

      

    )
}

export default CreateUserPage;