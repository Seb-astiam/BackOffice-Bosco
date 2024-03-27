import { Nav } from "../components/nav";
import { SideBar } from "../components/sideBar";
import { Users } from "../components/users";
import { Route, Routes } from "react-router-dom";
import { PanelUsuario } from "../components/panelUsuario";
import { CreateUserAdmin } from "../components/createUserAdmin/createUserAdmin";

export const Inicio = () => {

    return (
      <div className='w-full h-[100vh] flex flex-col justify-start items-start' >
        <Nav />

        <div className="flex w-full">
          <SideBar />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/panel-de-usuario" element={<PanelUsuario />} />
            <Route path="/registro" element={<CreateUserAdmin  />} />
          </Routes>
        </div>
      </div>  
    )
  }
  