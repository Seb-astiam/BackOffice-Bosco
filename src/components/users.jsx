import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser"
import { List, ListItem } from '@tremor/react';
import axios from "axios";
import { useState } from "react";
import { btn } from "../estilos/estilosLogin";

export const Users = () => {
  useUsers();
  const usuarios = useSelector((state) => state.storage.allUsers);

  const [mensajeConfirmacion, setMensajeConfirmacion]= useState(false)

  const clickFunction = async (email) => {
    try {
      const { data } = await axios.delete(`/user/${email}`);
      useUsers();
      setMensajeConfirmacion(true)
      
    } catch (error) {
      window.alert('Error al eliminar usuario');
      return console.error(error)
    }
  }

  // useEffect(() => {
  //   if (mensajeConfirmacion) {
  //     useUsers();
  //   }
  // }, [mensajeConfirmacion])

    return (
      <div className="bg-blue-200 w-[90%] flex justify-center items-start"> 
        <div className="flex flex-col justify-center items-center gap-2 w-[450px] ">
          { usuarios.map((usuario) => {
              const {name, email, id } = usuario
            return <div className="flex w-full gap-5" key={id}>
              <List > 
                <ListItem className="text-black">
                  <span>{name}</span>
                  <span>{email}</span>
                </ListItem>
              </List>

              <button onClick={() => clickFunction(email)} className={btn}>Eliminar</button>
            </div>
          })}
        </div>

        <div className={`${mensajeConfirmacion? 'bg-[rgba(0,_0,_0,_0.5)] ' : '-translate-y-[500%]'} w-screen h-screen flex justify-center items-center absolute`}>
          <div className= {`${mensajeConfirmacion? '' : '-translate-y-[500%]'} flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[450px]`}>
              <h1>Usuario</h1>
              <h3>Eliminado Correctamente</h3>

              <button onClick={()=> setMensajeConfirmacion(false)} className={btn}>cerrar</button>
          </div>
        </div>

      </div>  
    )
}