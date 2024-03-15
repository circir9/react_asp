import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VisitorMessageBoard from "../components/VisitorMessageBoard";
import "./VisitorMessagePage.css"

const VisitorMessagePage  = () =>{
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/VisitorMessage` ,{credentials: "include"})
          .then((response) => response.data)
          .then((members) => setVisitors(members));
    }, []);

    const handleClick = (id, messages) => {
        messages = messages?(messages):("");
        axios.patch(`${process.env.REACT_APP_API_SERVER_URL}/api/VisitorMessage/${id}`,
        {
            message: messages
        },
        {
            headers: {
              'Content-Type': 'application/json'
            }
        });
    };

    return (
      <div className="center-content">
          <div className="message-board-container">
            <div>
            {
                visitors.map((item) => {
                    item.message = item.message?(item.message):("    ");
                    return <ul 
                        className="visitor-message-list"
                        key={item._id}
                    >
                        <div className='p-visitor-name'>
                            {item.name}:
                        </div>
                        <div className='p-v-message' style={{cursor: 'pointer'}}>
                            <VisitorMessageBoard CallbackFn={(message) => handleClick(item._id, message)} message={item.message} />
                        </div>
                    </ul>;
                })
            }
            </div>
          </div>
      </div>
    );
}

export default VisitorMessagePage;