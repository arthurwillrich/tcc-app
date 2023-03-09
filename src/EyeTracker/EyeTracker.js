import webgazer from 'webgazer/src/index.js';
import { useEffect, useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import Downloader, { Downloadzin } from '../components/Downloader.js';
import Video from '../SelectVideo/Video.js';
import { SelectVideoPage } from '../SelectVideo/SelectVideoPage.js';
import './EyeTracker.css';
import { api, uploadCoords } from "../services/api";


function EyeTracker() {
  const selectedVideo = localStorage.getItem('selectedVideo').replace(/"/g, '');
  const [videoUrl, setVideoUrl] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = async () => {
    setVideoEnded(true);
    webgazer.pause();
  
    // Chama a função uploadCoords passando as coordenadas e aguarda a resposta
    try {
      console.log("coords antes:",coords)
      const response = await uploadCoords(coords);
      // console.log("Upload de coordenadas realizado com sucesso!");
      // console.log(response.data);
    } catch (error) {
      console.error("Erro ao fazer upload de coordenadas:", error);
    }
  
    Downloadzin(coords);
    console.log("acabou")
    setShowPopup(true); // exibe o popup quando o vídeo terminar
  };
  
  const handleGoMenu = () => {
    webgazer.pause();
    navigate("/menu"); // navega para a página "/menu"
    window.location.reload();

  };

  const coords = [];

  useEffect(() => {
    webgazer.setGazeListener(async function (data, elapsedTime) {
      if (data == null) {
        return;
      }
      var xprediction = data.x; //these x coordinates are relative to the viewport
      var yprediction = data.y; //these y coordinates are relative to the viewport

      const jsonData = { "x:": xprediction, "y:": yprediction }
      coords.push(jsonData)

    }).begin();
  }, []);

  return (
    <div className="App">
      <video src={`http://localhost:5000/videos/${selectedVideo}`} onEnded={handleVideoEnd} autoPlay/>
      {showPopup && (
        <div className="popup">
          <p>O upload foi realizado com sucesso!</p>
          <button onClick={handleGoMenu}>Voltar ao menu</button>
        </div>
      )}
    </div>
  );
}  


export default EyeTracker;
