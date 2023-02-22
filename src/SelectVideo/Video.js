import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./Video.css";
import * as fs from 'fs';
import axios from 'axios';
import VideoSelect from './VideoSelect';

function Video() {

    return (
      <div>
        <h1>Selecione um vídeo:</h1>
        <VideoSelect />
      </div>
    );
  }

export default Video;
