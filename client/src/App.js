import HomePage from "./page/HomePage";
import VisitorMessagePage from "./page/VisitorMessagePage";
import MainLayout from "./layout/MainLayout";
import React from 'react';
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
            <Route path="/visitor" element={
                <MainLayout>
                    <VisitorMessagePage />
                </MainLayout>
            }/>
        </Routes>
    </HashRouter>
  );
}

export default App;
