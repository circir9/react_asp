import React, { useState } from 'react';
import axios from 'axios';

const VideoPage = () => {
    return (
        <div>
            <video controls src={`${process.env.REACT_APP_API_SERVER_URL}/api/Video`}></video>
        </div>
    );

};

export default VideoPage;