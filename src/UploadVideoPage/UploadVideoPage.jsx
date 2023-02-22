// import Upload from "rc-upload";
// import { Line } from "rc-progress";
// import { api, uploadVideo } from "../services/api"
// import React, {useEffect, createContext , useContext, useState} from "react";


// const UploadVideoPage = () => {

//     const Catogory = [
//         { value: 0, label: "Film & Animation" },
//         { value: 0, label: "Autos & Vehicles" },
//         { value: 0, label: "Music" },
//         { value: 0, label: "Pets & Animals" },
//         { value: 0, label: "Sports" },
//     ]


//     const [videoData, setVideoData] = useState();
//     const [fileName, setFileName] = useState();
//     const [fileSize, setFileSize] = useState();

//     const props = {
//         action: uploadVideo(videoData, fileName, fileSize),
//         accept: ".png, .pdf, .txt",
//         beforeUpload(file) {
//           // Start upload
//           setIsUploading(true);
//           // Set file details
//           setFileName(file.name);
//           setFileSize(Math.floor(file.size / 1000));
//           // Display image for .png format
//           if (file.type === "image/png") {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               setVideoData(reader.result);
//             };
//             reader.readAsDataURL(file);
//           }
//         },
//         onSuccess() {
//           // Finish upload
//           console.log(videoData)
//           setIsUploading(false);
//         },
//         onProgress(step) {
//           // Update progress
//           setPercentage(Math.round(step.percent));
//         },
//         onError(err) {
//           console.log(videoData)
//           console.log("onError", err);
//         }
//       };

//     const handleChangeTwo = (event) => {
//         console.log(event.currentTarget.value)
//     }


//     const [percentage, setPercentage] = useState(0);
//     const [isUploading, setIsUploading] = useState(false);

//     return (
//         <div className="App">
//           {fileName && (
//             <React.Fragment>
//               {videoData && (
//                 <div>
//                   <img src={videoData} alt="uploaded" width="250" />
//                 </div>
//               )}
//               <div className="upload-list">
//                 <div className="file-name">
//                   <b>{fileName}</b>
//                 </div>
//                 <div className="progress-container">
//                   <Line
//                     percent={percentage}
//                     strokeWidth={9}
//                     trailWidth={9}
//                     trailColor="#FFF"
//                     strokeColor={isUploading ? "#41C3D2" : "#92ed14"}
//                   />
//                   <div className="progress-text">
//                     {isUploading ? `Uploading ${percentage}% ` : `Finished`}
//                   </div>
//                 </div>
//                 <div className="file-size">{`${fileSize} KB`}</div>
//               </div>
//             </React.Fragment>
//           )}
//           <Upload {...props}>
//             <button id="upload-button">Upload File</button>
//           </Upload>
//         </div>
//       );
//     }

// export default UploadVideoPage


import React, { useState } from 'react';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});


const UploadVideoPage = () => {

  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append('video', selectedFile);

    const token = localStorage.getItem('token');

    

    axios.post('http://localhost:5000/uploadFiles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUploadFile}>Enviar</button>
    </div>
  );
}


export default UploadVideoPage