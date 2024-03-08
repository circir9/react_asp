import HomePage from "./page/HomePage";
import MainLayout from "./layout/MainLayout";
import React, {useState} from 'react';
import {HashRouter,Route,Routes} from "react-router-dom";

function App() {
  return (
    <HashRouter>
        <Routes>
            <Route exact={true} path="/" element={
                <MainLayout>
                    <HomePage />
                </MainLayout>
            }/>
        </Routes>
    </HashRouter>
  );
}

export default App;
