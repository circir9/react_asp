import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () =>{
    const [Seconds, setSeconds] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        let id = setInterval(() => {
            if(Seconds>0){
                setSeconds(Seconds-1);
            }
            else{
                navigate(`/`);
            }
        }, 1000);
        return function () {
          clearInterval(id);
        };
      }, [Seconds, navigate]);

    return (
        <div>
            <p style={{"font-size": "1.5cm", display: "flex", "flex-direction": "column", "align-items": "center"}}>登出成功於: {Seconds} 秒後返回首頁</p>
        </div>
    );
}

export default LogoutPage;