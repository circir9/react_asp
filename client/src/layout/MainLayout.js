import React from 'react';
import {Link} from "react-router-dom";
import "./MainLayout.css"

const MainLayout = (props) => {
    return(
        <>
            <nav className='top_layout'>
                <Link to="/" className="container_top_link">
                    <p className="top_link">
                        點我連到第一頁
                    </p>
                </Link>
            </nav>
            { props.children }
        </>
    )
};

export default MainLayout;