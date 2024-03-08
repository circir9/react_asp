import React from 'react';
import HomeImage from '../pictures/welcome.png';

const HomePage = () =>{

    return (
        <div className="img-container">
            <img src={HomeImage} className="home-image-welcome" alt="get out" />
        </div>
    );
}

export default HomePage;