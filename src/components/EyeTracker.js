import {useEffect} from 'react'
import React, { useState } from 'react';
import Downloader from './Downloader';
import Video from './Video';
import { api, uploadCoords } from "../services/api"


function EyeTracker(){

    const coords = []
    useEffect(()=>{
        const webgazer = window.webgazer
        
      webgazer.setGazeListener(async function(data, elapsedTime) {
      if (data == null) {
          return;
      }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport

        const jsonData ={"x:":xprediction,"y:" :yprediction}
        coords.push(jsonData)

    }).begin();
    
      })
    return(
        <div className="App">
          <p>Eye Tracker</p>
          <Video />
          <Downloader coords={coords} />
        </div>
    )
}

export default EyeTracker;