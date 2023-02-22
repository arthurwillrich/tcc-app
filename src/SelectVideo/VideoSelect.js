import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function VideoSelect() {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const token = localStorage.getItem('token');

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

  // const handleVideoSelect = (selectedOption) => {
  //   setSelectedVideo(selectedOption.value);
  //   console.log(selectedOption.value);
  // };

  const handleVideoSelect = (selectedOption) => {
    setSelectedVideo(selectedOption.label);
    console.log(selectedOption.label);
  };
  


  // Transforma o objeto em array para o componente Select
  const videoOptions = Object.keys(videoList).map(key => ({
    value: videoList[key].path,
    label: videoList[key].name
  }));

  
  return (
    <div className='landingpage'>
        <div className="video-select">
            <Select value={{ value: selectedVideo, label: selectedVideo }} onChange={handleVideoSelect} options={videoOptions} />
        </div>
        <video src={`/videos/${selectedVideo}`} autoPlay loop muted className="video-bg"/>
    </div>
  )
}

export default VideoSelect;
