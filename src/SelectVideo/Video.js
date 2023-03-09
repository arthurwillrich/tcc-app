import React from 'react';
import "./Video.css";

function Video() {
  const selectedVideo = localStorage.getItem('selectedVideo').replace(/"/g, '');

  return (
    <div className="background-video">
      <video src={`http://localhost:5000/videos/${selectedVideo}`} autoPlay />
    </div>
  );
}

export default Video;
