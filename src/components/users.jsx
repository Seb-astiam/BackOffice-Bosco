import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser"
import { List, ListItem } from '@tremor/react';
import axios from "axios";
import { useState, useEffect } from "react";
import { btn } from "../estilos/estilosLogin";
import Swal from 'sweetalert2'


import { BarChart } from '@tremor/react';


export const Users = () => {

  useUsers();
  const usuarios = useSelector((state) => state.storage.allUsers);


  const usuariosActivos = usuarios.filter(usuario => usuario.status === true);
const usuariosBloqueados = usuarios.filter(usuario => usuario.status === false);


  
  const chartdata = [
    {
      name: 'Usuarios',
      Totales: usuarios.length,
    },
    {
      name: 'Usuarios activos',
      Totales: usuariosActivos.length,
    },
    {
      name: 'Usuarios bloqueados',
      Totales: usuariosBloqueados.length,
    }
  ]
  
  const dataFormatter = (number) =>
  new Intl.NumberFormat('us').format(number).toString();







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
      <div className="bg-blue-200 w-[80%] flex flex-col justify-start items-start p-3"> 
        <div className="flex flex-col justify-center items-center w-[900px] border border-black bg-white">

          <h1 className="font-mono">Tabla de usuarios</h1>
          { usuarios.map((usuario) => {
              const {name, email, id, status } = usuario
            return <div className="flex w-full gap-8 items-center border border-black border-l-0 border-r-0 p-2" key={id}>
              <List > 
                <ListItem className="text-black">
                  <span>{name}</span>
                  <span>{email}</span>
                </ListItem>
              </List>

              <List > 
                <ListItem className={`${status ? 'bg-green-800 ' : 'bg-red-800 '} text-white px-3 w-24 rounded`}>
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

          <BarChart
            className="mt-6 bg-white"
            data={chartdata}
            index="name" 
            categories={['Totales']} 
            colors={['orange']}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />


      </div>  
    )
}