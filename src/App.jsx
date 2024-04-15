import { Route, Routes,useLocation,    useNavigate, } from "react-router-dom";
import  Login  from "./views/Login";
import { Inicio } from "./views/Inicio";
import Nav from "./components/nav";
import Modal from 'react-modal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useState ,useEffect} from "react";

Modal.setAppElement('#root');
const App = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const location = useLocation();
  const showNav = location.pathname !== '/';

  useEffect(() => {
    !loggedInUser && navigate("/");
  }, [loggedInUser]);
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


