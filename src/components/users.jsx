import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUser";
import axios from "axios";
import { btn } from "../estilos/estilosLogin";
import Swal from 'sweetalert2';
import { NavLink } from "react-router-dom";

export const Users = () => {
  useUsers();
  const usuarios = useSelector((state) => state.storage.allUsers);

  const [input, setInput] = useState({
    block: false,
    email: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const clickFunction = async (selectedValue, email) => {
    try {
      setInput({
        block: selectedValue.toLowerCase() === "desbloquear",
        email: email
      });
    } catch (error) {
      window.alert('Error al actualizar el estado del usuario');
      console.error(error);
    }
  };

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
    <div className="m-portlet__body min-h-screen bg-gray-100 px-20 mr-4">
      <div className="table-responsive">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2 py-2 text-sm">Nombre </th>
              <th className="px-2 py-2 text-sm">Correo </th>
              <th className="px-2 py-2 text-sm">Estado</th>
              <th className="px-2 py-2 text-sm">Detalle</th>
              <th className="px-2 py-2 text-sm">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers && currentUsers.map((usuario) => {
              const { name, email, id, status } = usuario;

              const handleSelectChange = (selectedValue) => {
                clickFunction(selectedValue, email);
              };

              return (
                <tr key={usuario.id}>
                  <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">{name}</td>
                  <td className="border px-1 py-0.3 text-sm w-20 mt-1">{email}</td>
                  <td className={`border px-1 py-0.3 text-sm w-20 mt-1 ${status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{status ? "Activo" : "Bloqueado"}</td>
                  <td className="border px-1 py-0.3 text-sm w-20 mt-1"><NavLink to={`/detail/${id}/${email}`}>Detalle..</NavLink></td>
                  <td className="border px-2 py-0.3 text-sm w-20 mt-1">
                    <select className={`${btn} ${status ? "hover:bg-blue-100 hover:text-black" : "bg-gray-300 cursor-not-allowed"}`} defaultValue="" onChange={(e) => handleSelectChange(e.target.value)}>
                      <option value="" disabled hidden>Seleccione la acción</option>
                      <option value="bloquear" disabled={!status}>Bloquear</option>
                      <option value="desbloquear" disabled={status}>Desbloquear</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l"
        >
          Anterior
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`ml-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 ${currentPage === number ? 'bg-gray-400' : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentUsers.length < usersPerPage}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
