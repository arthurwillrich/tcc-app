import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Navigate, useNavigate } from "react-router-dom";
import './SelectVideoPage.css'

export const SelectVideoPage = (props) => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/getVideoList', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then(response => {
        setVideoList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleVideoSelect = (selectedOption) => {
    setSelectedVideo(selectedOption.label);
    localStorage.setItem("selectedVideo", JSON.stringify(selectedOption.label));
  };

  
  const handleNextButtonClick = () => {
     navigate('/eyeTracker')
  }

  // Transforma o objeto em array para o componente Select
  const videoOptions = Object.keys(videoList).map(key => ({
    value: videoList[key].path,
    label: videoList[key].name
  }));

  return (
    <div className='landingpage'>
      <h1>Selecione um Vídeo</h1>
      <div className="video-select">
        <Select value={{ value: selectedVideo, label: selectedVideo }} onChange={handleVideoSelect} options={videoOptions} />
      </div>
      <div className='actions'>
        <button onClick={handleNextButtonClick}>Avançar</button>
      </div>
    </div>
  )
}
export default SelectVideoPage;
