import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const UploadVideoPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append('video', selectedFile);
    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:5000/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage('Vídeo enviado com sucesso!');
      })
      .catch((error) => {
        setMessage('Erro ao enviar vídeo. Provavelmente já foi enviado um vídeo com o mesmo nome.');
      });
  };

  return (
    <div>
      <div>
        <h1 htmlFor="file-input">Escolher Vídeo:</h1>
      </div>
      <div>
        <input id="file-input" type="file" onChange={handleFileInput} />
      </div>
      <button onClick={handleUploadFile}>Enviar</button>
      {message && <p>{message}</p>}
      <button onClick={() => navigate('/menu')}>Retornar ao Menu</button>
    </div>
  );
};

export default UploadVideoPage;
