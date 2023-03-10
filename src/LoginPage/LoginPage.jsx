import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import "./styles.css"    
import { Navigate, useNavigate } from "react-router-dom";



const LoginPage = () => {
    const {authenticated, login, logout} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const handleLogout = () => {
        logout();
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit ", {email, password})
        login(email, password) // context integration
    }

    const handleCreate = () => {
        navigate("/createUser")
    }
    return (
        <div id="login">
            <h1 className="title"> Login do Sistema</h1>            
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
                    <button type="submit">Entrar</button>
                    <button onClick={handleCreate}>Criar Operador</button>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;