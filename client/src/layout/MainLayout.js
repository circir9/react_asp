import React from 'react';
import {Link} from "react-router-dom";
import "./MainLayout.css"

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
            </nav>
            { props.children }
        </div>
    )
};

export default MainLayout;