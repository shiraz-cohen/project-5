import { Route,Routes } from "react-router-dom";
import Application from "./pages/Application";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="Application" element={<Application/>}/>
      <Route path="/application/:id/posts" element={<Posts/>}/>
      <Route path="/application/:id/todos" element={<Todos/>}/>
    </Routes>
  ) 

}





export default App;
