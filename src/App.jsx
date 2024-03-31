import { Route, Routes } from "react-router-dom";
import { Login } from "./views/Login";
import { Inicio } from "./views/Inicio";

import Modal from 'react-modal';
import { PrivateRoute } from "./components/privateRoute";

Modal.setAppElement('#root');
const App = () => {

  return (
    <div> 
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios/*" element={
          <PrivateRoute>
            <Inicio />
          </PrivateRoute>
        } />
      
      </Routes>
      
      
    </div>  
    
  )
}

export default App;
