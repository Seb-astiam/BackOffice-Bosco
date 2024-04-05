import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser"
import { List, ListItem } from '@tremor/react';
import axios from "axios";
import { useState, useEffect } from "react";
import { btn } from "../estilos/estilosLogin";
import Swal from 'sweetalert2'



import { NavLink } from "react-router-dom";


export const Users = () => {

  useUsers();
  const usuarios = useSelector((state) => state.storage.allUsers);


  const usuariosActivos = usuarios.filter(usuario => usuario.status === true);
const usuariosBloqueados = usuarios.filter(usuario => usuario.status === false);


  
  
  
 







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

        setTimeout(() => {
          window.location.reload(true);
        }, 1500); 
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
      <div className="bg-blue-200 w-full flex flex-col justify-start items-start p-3"> 
        <div className="flex flex-col justify-center items-center border border-black bg-white w-[900px]">
          <h1 className="font-bold bg-blue-800 text-white text-3xl py-5 w-full h-full text-center">Tabla de usuarios</h1>
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Nombre</th>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Correo</th>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Estado</th>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Detalle</th>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Bloquear</th>
                <th className="px-4 py-2 border border-black bg-blue-300 text-black">Desbloquear</th>
              </tr>
            </thead>
            <tbody className="bg-blue-100 font-bold">
              { usuarios && usuarios.map((usuario) => {
                const { name, email, id, status } = usuario;
                return (
                  <tr key={id} className="border border-black">
                    <td className="px-4 py-2 border border-black">{name}</td>
                    <td className="px-4 py-2 border border-black">{email}</td>
                    <td className={`px-4 py-2 border border-black ${status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {status ? "Activo" : "Bloqueado"}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      <button className="bg-gray-950 hover:bg-gray-200 hover:text-black text-white font-bold py-2 px-4 rounded">
                      <NavLink to={`/usuarios/detalle/${email}`}>Detalle..</NavLink>
                      </button>
                    </td>
                    <td className={`px-4 py-2 border border-black`}>
                      <button onClick={clickFunction} className={`${btn} ${status ? "hover:bg-blue-100 hover:text-black" : "bg-gray-300 cursor-not-allowed"}`}
                      value={email}
                      name="email"
                      disabled={!status}
                      >
                        Bloquear
                      </button>
                    </td>
                    <td className={`px-4 py-2 border border-black`}>
                      <button onClick={clickFunction} className={`${btn} ${!status ? "hover:bg-blue-100 hover:text-black" : "bg-gray-300 cursor-not-allowed"}`}
                      value={email}
                      name="email"
                      disabled={status}
                      >
                        Desbloquear
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>


         


      </div>  




    )
}