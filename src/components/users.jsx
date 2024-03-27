import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser"
import { List, ListItem } from '@tremor/react';
import axios from "axios";
import { useState, useEffect } from "react";
import { btn } from "../estilos/estilosLogin";
import Swal from 'sweetalert2'


export const Users = () => {
  useUsers();
  const usuarios = useSelector((state) => state.storage.allUsers);

  const [input, setInput] = useState({
    block: false,
    email: ''
  })

  const clickFunction = async (e) => {
    const { value, name } = e.target;
  
    try {
      setInput(prevState => ({
        ...prevState,
        [name]: value
      }));
  
    } catch (error) {
      window.alert('Error al eliminar usuario');
      console.error(error);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.put(`/user/status`, input, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
  
        setInput({
          block: false,
          email: ''
        });
      } catch (error) {
        window.alert('Error al eliminar usuario');
        console.error(error);
      }
    };
  
    if (input.email) {
      fetchData();
    }
  }, [input.email]);



    return (
      <div className="bg-blue-200 w-[80%] flex justify-center items-start"> 
        <div className="flex flex-col justify-center items-center gap-2 w-[800px] ">
          { usuarios.map((usuario) => {
              const {name, email, id, status } = usuario
            return <div className="flex w-full gap-5" key={id}>
              <List > 
                <ListItem className="text-black">
                  <span>{name}</span>
                  <span>{email}</span>
                </ListItem>
              </List>

              <List > 
                <ListItem className="text-black">
                <span>{status? "Activo" : "Bloqueado"}</span>
                </ListItem>
              </List>


              <button
                onClick={(e) => clickFunction(e)}
                value={email}
                name="email"
                className={`${btn} ${status ? "" : "bg-gray-300 cursor-not-allowed"}`}
                disabled={!status}
              >
                Bloquear
              </button>
              <button
                onClick={(e) => clickFunction(e)}
                value={email}
                name="email"
                className={`${btn} ${!status ? "" : "bg-gray-300 cursor-not-allowed"}`}
                disabled={status}
              >
                Desbloquear
              </button>
            </div>
          })}
        </div>
      </div>  
    )
}