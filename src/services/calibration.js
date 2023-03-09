import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import webgazer from 'webgazer/src/index.js';
import './Calibration.css';

function Calibration() {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const navigate = useNavigate();

  const calibrationPoints = [
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 500, y: 100 },
    { x: 100, y: 300 },
    { x: 300, y: 300 },
    { x: 500, y: 300 },
    { x: 100, y: 500 },
    { x: 300, y: 500 },
    { x: 500, y: 500 },
  ];

  useEffect(() => {
    const point = calibrationPoints[currentPoint];
    const element = document.getElementById(`calibration-point-${currentPoint}`);

    const onWebgazerPoint = (x, y) => {

      const distance = Math.sqrt(Math.pow(x.x - point.x, 2) + Math.pow(x.y - point.y, 2));

      if (distance < 50) {
        element.style.backgroundColor = 'green';
        setCurrentPoint(currentPoint + 1);
      }
    };

    webgazer.setGazeListener(onWebgazerPoint);

    if (currentPoint === 0) {
      webgazer.showVideoPreview(false);
      webgazer.showPredictionPoints(true);
      webgazer.begin();
    }

    if (currentPoint >= calibrationPoints.length) {
      webgazer.pause();
      setCalibrationComplete(true);
    }

    return () => {
      webgazer.clearGazeListener();
    };
  }, [currentPoint, calibrationPoints]);

  const calibrationPointElements = calibrationPoints.map((point, index) => (
    <div
      key={index}
      id={`calibration-point-${index}`}
      className="calibration-point"
      style={{ left: point.x, top: point.y }}
    />
  ));

  const handleNextClick = () => {
    navigate('/eyeTrackerMenu');
  };

  return (
    <div id="calibration-container">
      {calibrationPointElements}
      {calibrationComplete && (
        <div className="calibration-complete-popup">
          <p>Calibration complete!</p>
          <button onClick={handleNextClick}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Calibration;
