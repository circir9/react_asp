import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VisitorMessageBoard from "../components/VisitorMessageBoard";

const VisitorMessagePage  = () =>{
    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/VisitorMessage` ,{credentials: "include"})
          .then((response) => response.data)
          .then((members) => setVisitors(members));
    }, []);

    const handleClick = (id, messages) => {
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
                    return <ul 
                        className="visitor-message-list"
                        key={item._id}
                    >
                        <div>
                            {item.name}
                        </div>
                        <div style={{ cursor: 'pointer' }}>
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