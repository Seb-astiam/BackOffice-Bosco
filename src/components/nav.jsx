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

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useLocalStorage } from '../hooks/useLocalStorage';
const Nav = () => {
  const [loggedInUser] = useLocalStorage('loggedInUser', null);


  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-300 border-b border-gray-400">
     
      <div className="flex items-center">
       
        <h1 className="text-xl font-semibold">Bosco Back Office</h1>
      </div>
      {/* Usuario */}
      <div className="flex items-center">
      <FontAwesomeIcon icon={faBell} className="text-red-500 mr-2" />
        <span className="text-sm mr-3">{loggedInUser}</span>
        <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden flex justify-center items-center">
          <img src="/public/bosco.jpeg" alt="Avatar" className="h-full w-auto rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
