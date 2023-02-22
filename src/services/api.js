import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createUserApi = async (email, password) => {
    console.log("dentro3")

    return api.post("/users", {email, password})
}

export const createSession = async (email, password) => { 
    console.log("dentro4")

    const token = localStorage.getItem('token');

    return api.post("/sessions", {email, password})
};

export const createPatientApi = async (name, cpf_responsible, neuroatipical) => {
    console.log("dentro1")
    const token = localStorage.getItem('token');

    return api.post("/patient", {name, cpf_responsible, neuroatipical },{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
export const uploadCoords = async (id, coords) => {
    console.log("dentro2")

    const token = localStorage.getItem('token');

    return api.post(`/patient?idcreateSession=${id}`, {coords},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const uploadVideo = async (videoData, videoName, videoSize) => {
    console.log("iniciando upload do video para o backend");
    console.log("API: ", videoSize)
    const token = localStorage.getItem('token');
    return api.post("/uploadVideo", {videoData, videoName, videoSize }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    
}

export const getPatientList = async () => {
    console.log("dentro5")

    const token = localStorage.getItem('token');

    return api.get(`/patient`, {},{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });};

