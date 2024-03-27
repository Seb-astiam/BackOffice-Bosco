import { NavLink } from "react-router-dom"
import { btn } from "../estilos/estilosLogin"

export const SideBar = () => {

    return (
      <div className="bg-blue-300 h-[100vh] w-[10%] flex flex-col gap-5"> 
        <NavLink to='/inicio/panel-de-usuario' className={btn}>Panel de usuario</NavLink>
        <NavLink to='/inicio/registro' className={btn}>Crear UserAdmin</NavLink>
        <NavLink to='/inicio' className={btn}>home</NavLink>
         Soy sideBar
        
      </div>  
    )
}