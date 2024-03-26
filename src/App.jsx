import { Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
import { Inicio } from "./views/Inicio";

const App = () => {

  return (
    <div> 
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
      
      
    </div>  
  )
}

export default App
