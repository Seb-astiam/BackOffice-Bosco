import { Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
import { Inicio } from "./views/Inicio";
import Housings from "./components/housing/housings";
import Modal from 'react-modal';


Modal.setAppElement('#root');
const App = () => {

  return (
    <div> 
      <Inicio />
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio/*" element={<Inicio />} />
        <Route path="/iframe" element={<Housings />} />
         
      </Routes>
      
      
    </div>  
    
  )
}

export default App;
