import React from "react";
import './styles.css'
import { Navigate, useNavigate } from "react-router-dom";

const EyeTrackerMenuPage = () => {
    const navigate = useNavigate()

  const handleReturnToMenu = () => {
   navigate("/menu");
   window.location.reload();

  };

  const handleCalibrate = () => {
    navigate("/calibrate");
  };

  const handleEyeTracker = () => {
    navigate("/selectVideo");
  };    

  return (
      <div className="eye-tracker-menu">
        <h1>Eye Tracker Menu</h1>
        <button onClick={handleReturnToMenu}>Retornar ao Menu</button>
        <button onClick={handleCalibrate}>Realizar Calibração</button>
        <button onClick={handleEyeTracker}>Realizar Coleta</button>
      </div>
    );
    
};

export default EyeTrackerMenuPage;
