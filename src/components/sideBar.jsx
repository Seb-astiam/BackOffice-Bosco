import { Link } from "react-router-dom"
import { useState } from "react"
export const SideBar = () => {
  const [subMenuState, setSubMenuState] = useState({
    usuarios: false,
    alojamientos: false,
    reservas: false,
    empresas: false,
    servicios: false,
    payments: false,
  });
  const toggleSubMenu = (submenu) => {
    setSubMenuState(prevState => ({
      ...prevState,
      [submenu]: !prevState[submenu]
    }));
  };
    return (
      <div className="sidebar bg-gray-800 text-white h-screen  w-64  flex flex-col">
      <div className="sidebar-header py-4 px-6 text-xl font-bold">Menú</div>
      <ul className="menu flex-grow">
        <li>
          <Link to="/dashboard" className="block py-3 px-6 hover:bg-gray-700">Dashboard</Link>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('usuarios')}>
            Usuarios
          </span>
          <ul className={`submenu ${subMenuState.usuarios ? 'block' : 'hidden'}`}>
            <li><Link to="/usuarios/ver" className="block py-2 px-12 hover:bg-gray-700">Ver Usuarios</Link></li>
            <li><Link to="/usuarios/buscar" className="block py-2 px-12 hover:bg-gray-700">Buscar</Link></li>
            <li><Link to="/usuarios/reportes" className="block py-2 px-12 hover:bg-gray-700">Reportes</Link></li>
          </ul>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('alojamientos')}>
            Alojamientos
          </span>
          <ul className={`submenu ${subMenuState.alojamientos ? 'block' : 'hidden'}`}>
            <li><Link to="/alojamientos/ver" className="block py-2 px-12 hover:bg-gray-700">Ver Alojamientos</Link></li>
            <li><Link to="/alojamientos/reportes" className="block py-2 px-12 hover:bg-gray-700">Reportes</Link></li>
          </ul>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('reservas')}>
            Reservas
          </span>
          <ul className={`submenu ${subMenuState.reservas ? 'block' : 'hidden'}`}>
            <li><Link to="/reservas/ver" className="block py-2 px-12 hover:bg-gray-700">Ver Reservas</Link></li>
            <li><Link to="/reservas/reportes" className="block py-2 px-12 hover:bg-gray-700">Reportes</Link></li>
          </ul>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('empresas')}>
            Empresas
          </span>
          <ul className={`submenu ${subMenuState.empresas ? 'block' : 'hidden'}`}>
            <li><Link to="/empresas/ver" className="block py-2 px-12 hover:bg-gray-700">Ver Empresas</Link></li>
          </ul>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('servicios')}>
            Servicios
          </span>
          <ul className={`submenu ${subMenuState.servicios ? 'block' : 'hidden'}`}>
            <li><Link to="/services/operations" className="block py-2 px-12 hover:bg-gray-700">Operaciones Servicios</Link></li>
            <li><Link to="/servicios/reportes" className="block py-2 px-12 hover:bg-gray-700">Reportes</Link></li>
          </ul>
        </li>
        <li>
          <span className="block py-3 px-6 cursor-pointer hover:bg-gray-700" onClick={() => toggleSubMenu('payments')}>
            Payments
          </span>
          <ul className={`submenu ${subMenuState.payments ? 'block' : 'hidden'}`}>
            <li><Link to="/payments/all" className="block py-2 px-12 hover:bg-gray-700">All</Link></li>
            <li><Link to="/payments/reportes" className="block py-2 px-12 hover:bg-gray-700">Reportes</Link></li>
          </ul>
        </li>
      </ul>
    </div>
    )
}