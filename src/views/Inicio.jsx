import { Nav } from "../components/nav";
import { SideBar } from "../components/sideBar";
import { Users } from "../components/users";
import { Route, Routes } from "react-router-dom";
import { PanelUsuario } from "../components/panelUsuario";
import { CreateUserAdmin } from "../components/createUserAdmin/createUserAdmin";
import { Services } from "../components/services/Services";
import { Detalle } from "./detalle";

export const Inicio = () => {

    return (
      <div className='w-full h-[100vh] flex flex-col justify-start items-start' >
        <Nav />

        <div className="flex w-full">
          <SideBar />
          <div className="flex flex-col items-center w-full">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/panel-de-usuario" element={<PanelUsuario />} />
              <Route path="/registro" element={<CreateUserAdmin  />} />
              <Route path="/services/operations" element={<Services />} />
              <Route path="/detalle/:email" element={<Detalle />} />
            </Routes>
          </div>
        </div>
      </div>  
    )
  }
  