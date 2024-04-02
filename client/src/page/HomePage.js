import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeImage from '../pictures/welcome.png';

const HomePage = () =>{
    const [username, setUsername] = useState("guest");

    useEffect(() => {
        if(localStorage.getItem("token")){
            axios.get(`${process.env.REACT_APP_API_SERVER_URL}/username`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            ).then((response) => {
                setUsername(response.data);
            });
        }
    }, [username]);

    return (
        <div className="img-container">
            <p style={{position: "absolute"}}>USER: {username}</p>
            <img src={HomeImage} className="home-image-welcome" alt="get out" />
        </div>
    );
}

export default HomePage;