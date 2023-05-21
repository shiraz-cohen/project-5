import { Route,Routes } from "react-router-dom";
import Application from "./pages/Application";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="Application" element={<Application/>}/>
      <Route path="/application/:id/posts" element={<Posts/>}/>
      <Route path="/application/:id/todos" element={<Todos/>}/>
      <Route path="/application/:id/albums" element={<Albums/>}/>
      <Route path="/application/:id/albums/photos" element={<Photos/>}/>
    </Routes>
  ) 

}





export default App;
