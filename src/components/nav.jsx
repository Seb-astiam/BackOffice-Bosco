// import { useEffect, useState } from "react"
// import { LogoutButton } from "./logoutButton"

// export const Nav = () => {

//   const [user, setUser] = useState('')

//   const getData = () => {
//     return localStorage.getItem('loggedInUser')
//   }

//   useEffect(() => {
//     setUser(getData());
//   }, [])

//     return (
//       <div className="bg-blue-100 w-full flex gap-16"> 
//          Email del usuario: {user}

//          <LogoutButton />
        
//       </div>  
//     )
// }

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LogoutButton } from "./logoutButton"
const Nav = () => {
  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // const handleLogout = () => {
  //   // Aquí puedes implementar la lógica para cerrar sesión
  //   setLoggedInUser(null); // Por ejemplo, limpiar el usuario almacenado en el localStorage
  // };

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-300 border-b border-gray-400">
     
      <div className="flex items-center">
        <h1 className="text-4xl mr-3 text-blue-900 font-serif">Bosco Back Office</h1>
      </div>
      
      {/* Usuario */}
      <div className="flex items-center relative">
        <FontAwesomeIcon icon={faBell} className="text-red-500 mr-2 cursor-pointer" onClick={handleMenuToggle} />
        <span className="text-2xl mr-3 text-blue-900 font-serif">{loggedInUser}</span>
        <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center cursor-pointer" onClick={handleMenuToggle}>
          <img src="/public/bosco.jpeg" alt="Avatar" className="h-full w-auto rounded-full" />
        </div>
        {/* Menú desplegable */}
        {menuOpen && (
          <div className="absolute top-full right-0 bg-white text-gray-800 p-4 rounded shadow-lg">
            <LogoutButton/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
