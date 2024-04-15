import Nav from "../components/nav"
import { SideBar } from "../components/sideBar";
import { Users } from "../components/users";
import { Route, Routes ,useNavigate,} from "react-router-dom";
import { PanelUsuario } from "../components/panelUsuario";
import { CreateUserAdmin } from "../components/createUserAdmin/createUserAdmin";
import { useState ,useEffect} from "react";
import { Detalle } from "./detalle";
import Services2 from '../components/services/Services2'
import OccupancyReport from "../components/housing/ocupancyReport";
import Housings from "../components/housing/housings";


import UserPanel from "../components/users/Panel/userPanel";
import UserSearch from "../components/users/UserPanelComponents/useSearch";
import { useParams } from "react-router-dom";
import HosuingTypes from "../components/housingtypes/housingTypes";
import Roles from "../components/roles/roles";
import Dashboard from "../components/dasboard/dashboard";
import { useLocalStorage } from '../hooks/useLocalStorage';
import Reservartion from "../components/reservation/reservations";
export const Inicio = () => {

  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const navigate = useNavigate();
  useEffect(() => {
    !loggedInUser && navigate("/");
  }, [loggedInUser]);

    return (
      <div className='w-full h-[100vh] flex flex-col justify-start items-start  min-w-screen min-h-screen bg-gray-100 overflow-y-auto ' >
      

        <div className="flex w-full">
          <SideBar />
          <div className="flex flex-col mr-4  w-full">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/panel-de-usuario" element={<PanelUsuario />} />
              <Route path="/registro" element={<CreateUserAdmin  />} />
              <Route path="/buscar" element={<UserSearch/>} />
              <Route path="/detalle/:email" element={<Detalle />} />
              <Route path="/services/operations" element={<Services2 />} />
              <Route path="/alojamientos/ver" element={<Housings />} />
              <Route path="/ocupancy" element={<OccupancyReport/>} />
              <Route path="/detail/:id/:email" element={<UserPanel />} />
              <Route path="/operations/types" element={<HosuingTypes />} />
              <Route path="/operations/roles" element={<Roles />} /> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reservas/ver" element={<Reservartion />} />
                
             


              
             
             

            </Routes>
          </div>
        </div>
      </div>  
    )
  }
  