// import { Link } from "react-router-dom";
// import { useState } from "react";
// export const SideBar = () => {
//   const [subMenuState, setSubMenuState] = useState({
//     usuarios: false,
//     alojamientos: false,
//     reservas: false,
//     empresas: false,
//     servicios: false,
//     payments: false,
//     reportes_housin: false,
//     tiposalojamiento:false,
//   });
//   const toggleSubMenu = (submenu) => {
//     setSubMenuState((prevState) => ({
//       ...prevState,
//       [submenu]: !prevState[submenu],
//     }));
//   };
//   return (
//     <div className="sidebar bg-gray-800 text-white h-screen  w-64  flex flex-col">
//       <div className="sidebar-header py-4 px-6 text-xl font-bold">Menú</div>
//       <ul className="menu flex-grow">
//         <li>
//           <Link to="/dashboard" className="block py-3 px-6 hover:bg-gray-700">
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("usuarios")}
//           >
//             Usuarios
//           </span>
//           <ul
//             className={`submenu ${subMenuState.usuarios ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/usuarios"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Ver Usuarios
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/usuarios/buscar"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Buscar
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/usuarios/registro"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Registro Usuario
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/usuarios/panel-de-usuario"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Panel de Usuario
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//   <span
//     className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//     onClick={() => toggleSubMenu("alojamientos")}
//   >
//     Alojamientos
//   </span>
//   <ul
//     className={`submenu ${subMenuState.alojamientos ? "block" : "hidden"}`}
//   >
//     <li>
//       <Link
//         to="/alojamientos/ver"
//         className="block py-2 px-12 hover:bg-gray-700"
//       >
//         Ver Alojamientos
//       </Link>
//     </li>
//     <li>
//       <span
//         className="block py-2 px-12 hover:bg-gray-700"
//         onClick={() => toggleSubMenu("reportes_housin")}
//       >
//         Reportes Alojamientos
//       </span>
//       <ul
//         className={`submenu ${
//           subMenuState.reportes_housin ? "block" : "hidden"
//         }`}
//         style={{ right: 0 }}
//       >
//         <li>
//           <Link to="/" className="block py-2 px-12 hover:bg-gray-700">
//             Ocupación por Ubicación
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="block py-2 px-12 hover:bg-gray-700">
//             Ocupación por Fecha y Tipo
//           </Link>
//         </li>
//         <li>
//           <Link to="/" className="block py-2 px-12 hover:bg-gray-700">
//             Ingresos por Tipo
//           </Link>
//         </li>
//       </ul>
//     </li>
//   </ul>
// </li>


//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("reservas")}
//           >
//             Reservas
//           </span>
//           <ul
//             className={`submenu ${subMenuState.reservas ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/reservas/ver"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Ver Reservas
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/reservas/reportes"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Reportes
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("empresas")}
//           >
//             Empresas
//           </span>
//           <ul
//             className={`submenu ${subMenuState.empresas ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/empresas/ver"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Ver Empresas
//               </Link>
//             </li>
//           </ul>
//         </li>
       
//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("servicios")}
//           >
//             Servicios
//           </span>
//           <ul
//             className={`submenu ${subMenuState.servicios ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/services/operations"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Operaciones Servicios
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/servicios/reportes"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Reportes
//               </Link>
//             </li>
//           </ul>
//         </li>

//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("tiposalojamiento")}
//           >
//            Tipos Alojamientos
//           </span>
//           <ul
//             className={`submenu ${subMenuState.tiposalojamiento ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Crear tipos
//               </Link>
//             </li>
//           </ul>
//         </li>    
//         <li>
//           <span
//             className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
//             onClick={() => toggleSubMenu("payments")}
//           >
//             Payments
//           </span>
//           <ul
//             className={`submenu ${subMenuState.payments ? "block" : "hidden"}`}
//           >
//             <li>
//               <Link
//                 to="/payments/all"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 All
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/payments/reportes"
//                 className="block py-2 px-12 hover:bg-gray-700"
//               >
//                 Reportes
//               </Link>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   );
// };

import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBed,
  faBriefcase,
  faClipboardList,
  faBuilding,
  faDollarSign,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export const SideBar = () => {
  const [subMenuState, setSubMenuState] = useState({
    usuarios: false,
    alojamientos: false,
    reservas: false,
    empresas: false,
    servicios: false,
    payments: false,
    reportes_housin: false,
    tiposalojamiento: false,
    roles:false,
  });

  const toggleSubMenu = (submenu) => {
    setSubMenuState((prevState) => ({
      ...prevState,
      [submenu]: !prevState[submenu],
    }));
  };

  return (
    <div className="sidebar bg-gray-800 text-white h-screen  w-100  flex flex-col">
      <div className="sidebar-header py-4 px-6 text-xl font-bold">Menú</div>
      <ul className="menu flex-grow">
        <li>
          <Link to="/dashboard" className="block py-3 px-6 hover:bg-gray-700">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("usuarios")}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Usuarios
          </span>
          <ul
            className={`submenu ${subMenuState.usuarios ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/usuarios"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Ver Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/usuarios/buscar"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Buscar
              </Link>
            </li>
            <li>
              <Link
                to="/usuarios/registro"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Crear Usuario
              </Link>
            </li>
            
          </ul>
        </li>

        
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("alojamientos")}
          >
            <FontAwesomeIcon icon={faBed} className="mr-2" />
            Alojamientos
          </span>
          <ul
            className={`submenu ${
              subMenuState.alojamientos ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                to="/usuarios/alojamientos/ver"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Ver Alojamientos
              </Link>
            </li>
            <li>
              <span
                className="block py-2 px-12 hover:bg-gray-700"
                onClick={() => toggleSubMenu("reportes_housin")}
              >
                Reportes Alojamientos
              </span>
              <ul
                className={`submenu ${
                  subMenuState.reportes_housin ? "block" : "hidden"
                }`}
                style={{ right: 0 }}
              >
                <li>
                  <Link to="/ocupancy" className="block py-2 px-12 hover:bg-gray-700">
                    Ocupación por Ubicación
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-12 hover:bg-gray-700">
                    Ocupación por Fecha y Tipo
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-12 hover:bg-gray-700">
                    Ingresos por Tipo
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("reservas")}
          >
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            Reservas
          </span>
          <ul
            className={`submenu ${subMenuState.reservas ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/usuarios/reservas/ver"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Ver Reservas
              </Link>
            </li>
            <li>
              <Link
                to="/reservas/reportes"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Reportes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("empresas")}
          >
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            Empresas
          </span>
          <ul
            className={`submenu ${subMenuState.empresas ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/empresas/ver"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Ver Empresas
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("roles")}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Roles
          </span>
          <ul
            className={`submenu ${subMenuState.roles ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/operations/roles"
                className="block py-2 px-12 hover:bg-gray-700"
              >
               Aministrar Roles
              </Link>
            </li>
            
            
            
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("servicios")}
          >
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Servicios
          </span>
          <ul
            className={`submenu ${subMenuState.servicios ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/usuarios/services/operations"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Operaciones Servicios
              </Link>
            </li>
            <li>
              <Link
                to="/usuarios/servicios/reportes"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Reportes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("tiposalojamiento")}
          >
            <FontAwesomeIcon icon={faBed} className="mr-2" />
            Tipos Alojamientos
          </span>
          <ul
            className={`submenu ${
              subMenuState.tiposalojamiento ? "block" : "hidden"
            }`}
          >
            <li>
              <Link to="/operations/types" className="block py-2 px-12 hover:bg-gray-700">
                Operaciones  Tipos
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span
            className="block py-3 px-6 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSubMenu("payments")}
          >
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Payments
          </span>
          <ul
            className={`submenu ${subMenuState.payments ? "block" : "hidden"}`}
          >
            <li>
              <Link
                to="/payments/all"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                All
              </Link>
            </li>
            <li>
              <Link
                to="/payments/reportes"
                className="block py-2 px-12 hover:bg-gray-700"
              >
                Reportes
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
