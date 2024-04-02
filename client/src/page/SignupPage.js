import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignupClick = () => {
        axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/Authenticate/register`,
        {
            username: username,
            password: password,
            email: email
        },
        { 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const { status } = response.data;
            console.log(response);
            if (status != "Success") {
                console.log('註冊失敗');
                alert("註冊失敗");
            }
            else {
                console.log('註冊成功');
                // 註冊成功並登入
                axios.post(`${process.env.REACT_APP_API_SERVER_URL}/api/Authenticate/login`,
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    const { token } = response.data;

                    if (token) {
                        localStorage.setItem("token", token);
                        console.log('登入成功');
                        navigate(`/`);
                    }
                    else {
                        console.log('登入失敗');
                        alert("帳號或密碼錯誤");
                    }
                })
                .catch((error) => {
                    console.log('登入失敗');
                    alert("帳號或密碼錯誤");
                    console.error(error);
                });
            }
        })
        .catch((error) => {
            console.log('註冊失敗');
            alert("註冊失敗");
            console.error(error);
        });
      };
    
    return (
        <div>
            <h1>註冊</h1>
            <p style={{ width:200 }}>
              <label style={{ margin: 2 }}>
                user name
                <span style={{ margin: 4, color: "red" }}>*</span>
              </label>
              <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p style={{ width:200 }}>
              <label style={{ margin: 2 }}>
                password
                <span style={{ margin: 4, color: "red" }}>*</span>
              </label>
              <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <p style={{ width:200 }}>
              <label style={{ margin: 2 }}>
                email
                <span style={{ margin: 4, color: "red" }}>*</span>
              </label>
              <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <button onClick={handleSignupClick}>Submit</button>
        </div>
    );

};

export default SignupPage;