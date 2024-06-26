import React from "react";
import {Link} from "react-router-dom";
import "./MainLayout.css"
import LogoutButton from "../components/Authentication/LogoutButton"

const MainLayout = (props) => {
    return(
        <div className='all-content-with-layout'>
            <nav className='top_layout'>
                <Link to="/" className="container_top_link">
                    <p className="top_link">
                        主頁
                    </p>
                </Link>
            </nav>
            <nav className='main_layout'>
                <Link to="/visitor" className="container_main_link">
                    <p className="main_link">
                        訪客留言
                    </p>
                </Link>
                <Link to="/up_down_file" className="container_main_link">
                    <p className="main_link">
                        檔案上傳
                    </p>
                </Link>
                <Link to="/video" className="container_main_link">
                    <p className="main_link">
                        影片
                    </p>
                </Link>
                <Link to="/chunk" className="container_main_link">
                    <p className="main_link">
                        大檔案上傳
                    </p>
                </Link>
                <Link to="/login" className="container_main_link">
                    <p className="main_link">
                        登入
                    </p>
                </Link>
                <Link to="/signup" className="container_main_link">
                    <p className="main_link">
                        註冊
                    </p>
                </Link>
                <a className="container_main_btn">
                    <LogoutButton/>
                </a>
            </nav>
            { props.children }
        </div>
    )
};

export default MainLayout;