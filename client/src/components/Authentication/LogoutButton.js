import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css"

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
    };

    return (
        <p className='c-logout-text' onClick={handleLogout}>
            登出
        </p>
    );
};

export default LogoutButton;