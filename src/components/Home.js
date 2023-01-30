import React, {useContext} from "react";
import {AuthContext} from "../context/auth";

function Home(){

    const { authenticated, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout();
    }
    return(
        <>
           <h1>Página Inicial</h1>
           <p>{String(authenticated)}</p>
           <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Home;