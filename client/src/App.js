import HomePage from "./page/HomePage";
import VisitorMessagePage from "./page/VisitorMessagePage";
import FileUpDownPage from "./page/FileUpDownPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import VideoPage from "./page/VideoPage";
import ChunkUploadPage from "./page/ChunkUploadPage";
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
            <Route path="/up_down_file" element={
                <MainLayout>
                    <FileUpDownPage />
                </MainLayout>
            }/>
            <Route path="/login" element={
                <MainLayout>
                    <LoginPage />
                </MainLayout>
            }/>
            <Route path="/signup" element={
                <MainLayout>
                    <SignupPage />
                </MainLayout>
            }/>
            <Route path="/video" element={
                <MainLayout>
                    <VideoPage />
                </MainLayout>
            }/>
            <Route path="/chunk" element={
                <MainLayout>
                    <ChunkUploadPage />
                </MainLayout>
            }/>
        </Routes>
    </HashRouter>
  );
}

export default App;
