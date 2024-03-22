import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VisitorMessageBoard from "../components/MessageBoard/VisitorMessageBoard";
import "./VisitorMessagePage.css"

const VisitorMessagePage  = () =>{
    const [visitors, setVisitors] = useState([]);
    const [postName, setPostName] = useState("");
    const [postMessage, setPostMessage] = useState("");
    const maxCount = 100;

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

    const handleVisitorSubmit = (e) =>{
        // 將成員新增到資料庫
        e.preventDefault();
    
        if ( postName && postName.length<11 && postMessage.length<=maxCount){
            axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/VisitorMessage`,
            {
                name: postName,
                message: postMessage
            },
            {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.data)
            .then((visitor) =>setVisitors([...visitors, visitor]));;
        }
        else{
          // 顯示錯誤訊息
          if (!postName) {
            alert("姓名不能為空值");
          } else if (postName.length>10) {
            alert("姓名必須少於10個字");
          } else if (postMessage.length>maxCount) {
            alert("留言必須少於100個字");
          }
        };
      };

    const onRemove = (item) => {
        const id = item._id;
        const newList = visitors.filter(e => e._id !== id);
        setVisitors(newList);
        axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/api/VisitorMessage/${id}`);
    };

    const handleMaxCount = (board) => {
        const { editText } = board.state;
        const { CallbackFn } = board.props;
        if(editText.length>maxCount){
          alert(`字數必須少於${maxCount}`);
        }
        else{
          CallbackFn(editText);
          board.setState({
            message: editText,
            isEditing: false
          });
        }
    }

    return (
        <div className="center-content">
            <div className='post-visitor-message-container'>
                <span className='v-post-name-input-container' style={{margin: 5}}>
                請輸入姓名:
                <input
                    style={{margin: 3}}
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setPostName(e.target.value)}
                />
                </span>
                <span className='v-post-message-input-container'>
                請輸入留言:
                <textarea
                    className='v-post-message-input'
                    style={{margin: 3}}
                    value={postMessage}
                    onChange={(e) => setPostMessage(e.target.value)}
                />
                </span>
                <button onClick={handleVisitorSubmit}>新增</button>
            </div>
            <div className="message-board-container">
                {
                    visitors.map((item) => {
                        return <ul 
                            className="visitor-message-list"
                            key={item._id}
                        >
                            <span className='v-remove-b'>
                                <button onClick={() => onRemove(item)}>刪除</button>
                            </span>
                            <div className='p-visitor-name'>
                                {item.name}:
                            </div>
                            <div className='p-v-message'>
                                <VisitorMessageBoard CallbackFn={(message) => handleClick(item._id, message)} LimitStateFn={handleMaxCount} message={item.message} />
                            </div>
                        </ul>;
                    })
                }
            </div>
        </div>
    );
}

export default VisitorMessagePage;