import { useEffect, useState } from "react"
import { LogoutButton } from "./logoutButton"

export const Nav = () => {

  const [user, setUser] = useState('')

  const getData = () => {
    return localStorage.getItem('loggedInUser')
  }

  useEffect(() => {
    setUser(getData());
  }, [])

    return (
      <div className="bg-blue-100 w-full flex gap-16"> 
         Email del usuario: {user}

         <LogoutButton />
        
      </div>  
    )
}