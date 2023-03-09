import React, { useEffect, useRef, useState } from "react";
import webgazer from 'webgazer/src/index.js';
// import {} from '../services/calibration'


const Calibration = () => {
    const [calibrated, setCalibrated] = useState(false);
  
    const startCalibration = async () => {
      // Define o modelo de regressão e classificação
      webgazer.setRegression("ridge")
    //   webgazer.setClassifier("knn")
  
      // Inicia o webgazer
      await webgazer.begin();
  
      // Inicia a calibração
      webgazer.showVideoPreview(false);
      webgazer.showPredictionPoints(true);
  
      // Aguarda até que a calibração esteja completa
      await webgazer
        .setGazeListener((data, timestamp) => {
          if (data == null) {
            return;
          }
          console.log(data);
          if (!calibrated) {
            if (webgazer.getTracker().getCalibrationPoints().length === 9) {
              setCalibrated(true);
              console.log("Calibração concluída!");
            }
          }
        })
        .showPredictionPoints(true);
    };
  
    useEffect(() => {
      startCalibration();
    }, []);
  
    return (
      <div>
        <h1>Calibração</h1>
        <p>{calibrated ? "Calibração concluída!" : "Calibrando..."}</p>
      </div>
    );
  };
  
  export default Calibration;