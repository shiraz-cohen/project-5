import { Route, Routes } from "react-router-dom";
import React from 'react';
import Application from "./pages/Application";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";
import Info from "./pages/Info";


//import NotFound from "./pages/NotFound";

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/application/:id" element={<Application />} />
      <Route path="/application/:id/info" element={<Info />} />
      <Route path="/application/:id/posts" element={<Posts />} />
      <Route path="/application/:id/todos" element={<Todos />} />
      <Route path="/application/:id/albums" element={<Albums />} />
      <Route path="/application/:id/albums/:id/photos" element={<Photos />} />
    </Routes>
  )
}
export default App;
