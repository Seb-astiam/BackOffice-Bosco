import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser"
import { List, ListItem } from '@tremor/react';

export const Users = () => {
  useUsers();

  const usuarios = useSelector((state) => state.storage.allUsers);
  

    return (
      <div className="bg-blue-200 w-[90%] flex justify-center items-start"> 
         <div className="flex flex-col justify-center items-center gap-2 w-[400px] ">
            { usuarios.map((usuario) => {
                const {name, email, id } = usuario
              return <List key={id}> 
                  <ListItem className="text-black">
                    <span>{name}</span>
                    <span>{email}</span>
                  </ListItem>
              </List>
            })}

         </div>
        
      </div>  
    )
}