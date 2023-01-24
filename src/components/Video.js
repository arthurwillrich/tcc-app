import videoBg from '../assets/videoBg.mp4'
import "./Video.css"
import React from 'react';

function Video() {
    return (
        <div className='landingpage'>

            <video src={videoBg} autoPlay loop muted class="video-bg"/>

        </div>
    )
}

export default Video;