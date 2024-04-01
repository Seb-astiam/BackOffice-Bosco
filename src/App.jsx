import { Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
import { Inicio } from "./views/Inicio";

import Modal from 'react-modal';


Modal.setAppElement('#root');
const App = () => {

  return (
    <div> 
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Inicio />} />
        <Route path="/usuarios/*" element={<Inicio />} />
     
    
         
      </Routes>
      
      
    </div>  
    
  )
}

export default App;
