// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { startCalibration, stopCalibration } from '../services/calibration';
// import webgazer from 'webgazer/src/index.js';
// import './styles.css';

// const CalibratePage = () => {
//   const navigate = useNavigate();
//   const [calibrated, setCalibrated] = useState(false);

//   useEffect(() => {
//     // webgazer
//     // .setRegression('ridge')
//     // .setTracker('clmtrackr')
//     // .setGazeListener(function(data,clock){
//     // }).begin()
//     // .showPredictionPoints(true);
//     startCalibration(webgazer, setCalibrated);
//     return () => {
//       stopCalibration();
//     };
//   }, []);

//   useEffect(() => {
//     if (calibrated) {
//         navigate("/")
//     }
//   }, [calibrated, navigate]);

//   return (
//     <div className="calibrate-container">
//       <div className="calibrate-box">
//         <div className="calibrate-point" id="calibration-div">
//           <div id="calibration-spot" />
//         </div>
//         <p className="calibrate-text">Clique no ponto vermelho 3 vezes</p>
//       </div>
//     </div>
//   );
// };

// export default CalibratePage;
