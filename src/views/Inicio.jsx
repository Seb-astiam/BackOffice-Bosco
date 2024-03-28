import { Nav } from "../components/nav";
import { SideBar } from "../components/sideBar";
import { Users } from "../components/users";
import { Route, Routes } from "react-router-dom";
import { PanelUsuario } from "../components/panelUsuario";
import { CreateUserAdmin } from "../components/createUserAdmin/createUserAdmin";
import Services from "../components/services/Services";

export const Inicio = () => {

    return (
      <div className='w-full h-[100vh] flex flex-col justify-start items-start' >
        <Nav />

        <div className="flex w-full">
          <SideBar />
          <div className="flex flex-col items-center  w-full lg:ml-8 p-2 mt-10"> {/* Agrega margen a la izquierda solo en pantallas grandes */}
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/panel-de-usuario" element={<PanelUsuario />} />
              <Route path="/registro" element={<CreateUserAdmin  />} />
              <Route path="/services/operations" element={<Services />} />
            </Routes>
          </div>
        </div>
      </div>  
    )
  }
  