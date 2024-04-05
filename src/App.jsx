import { Route, Routes,useLocation } from "react-router-dom";
import  Login  from "./views/Login";
import { Inicio } from "./views/Inicio";
import Nav from "./components/nav";
import Modal from 'react-modal';
// import { PrivateRoute } from "./components/privateRoute";


Modal.setAppElement('#root');
const App = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/';
  return (
    <div> 
       {showNav && <Nav />}
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios/*" element={ <Inicio /> } />
      
        <Route path="*" element={<Inicio />} />
        
     
    
         
      </Routes>
      
      
    </div>  
    
  )
}

export default App;
