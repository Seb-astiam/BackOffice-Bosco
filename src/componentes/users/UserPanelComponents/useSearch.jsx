import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const UserSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
console.log(searchInput);
  const handleChange = (e) => {
      
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });


   
  };

  const handleSearch = async () => {
    let query = "?";
  
    for (const [key, value] of Object.entries(searchInput)) {
      if (value) query += `${key}=${value}&`;
    }
  
    try {
      const { data } = await axios.get(`/userinfo${query}`);
    
      if (data && data.error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          text: "No se encontró el usuario.",
        });
      } else {
        setSearchResults(data)
      }


    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: "El  usuario no existe.",
      });
    }
  };
    
  console.log(searchResults);

  return (
    <div className='w-full h-[100vh] flex flex-row justify-between items-start flex-wrap mt-8'>
  <div className="md:w-1/2 lg:w-1/3">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-lg font-semibold mb-4">Búsqueda de usuarios</h3>
      
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input type="text" name="id"  value={searchInput.id || "" } 
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleChange}
             />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input type="text" name="name"  value={searchInput.name || ""} 
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleChange}
             />
          </div>

          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI</label>
            <input
             type="text" 
            name="dni" id="dni"
             className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
             value={searchInput.dni || ""} 
             onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
            <input type="text" name="email"
             id="email" 
             className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
             value={searchInput.email || ""} 
             onChange={handleChange}
             />
          </div>


          
         
        </div>
        <div className="mt-4">
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           type="submit"
            id="search"
           data-loading-text="<i class='fa fa-spin fa-spinner'></i> Buscando..."
          onClick={handleSearch}
           >
            Buscar
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" type="button" id="clear">
            Limpiar
          </button>
        </div>
      
    </div>
  </div>
    <div className="md:w-1/2 lg:w-2/3 px-4">
    <h3 className="text-lg font-semibold mb-4">Resultados de la Búsqueda</h3>
  <div className="shadow-md rounded  bg-white overflow-hidden">
  <table className="table-auto w-full">
  <thead className="bg-gray-200">
    <tr>
    <th className="px-4 py-2 text-sm">ID</th>
      <th className="px-4 py-2 text-sm">Nombre</th>
      <th className="px-4 py-2 text-sm">Correo</th>
      <th className="px-4 py-2 text-sm">Estatus</th>
    </tr>
  </thead>
  <tbody> 
  {searchResults && (
    Array.isArray(searchResults) ? (
      searchResults.map((sr) => {
        return (
          <tr key={sr.id} className="border-b">
            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5" value={sr.id}>
              <Link to={`/usuarios/detail/${sr.id}/${sr.email}`}>{sr.id}</Link>
            </td>
            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">{sr.name}</td>
            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">{sr.email}</td>
            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">
              <button type="button" className={sr.status ? "bg-green-500 text-white py-2 px-4 rounded-lg" : "bg-red-500 text-white py-2 px-4 rounded-lg"} data-toggle="modal" data-target="#lock-modal">
                {sr.status ? 'ACTIVO' : 'BLOQUEADO'}
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr key={searchResults.id} className="border-b">
        <td className="border px-1 py-0.3 text-sm w-20 mt-0.5" value={searchResults.id}>
          <Link to={`/usuarios/detail/${searchResults.id}/${searchResults.email}`}>{searchResults.id}</Link>
        </td>
        <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">{searchResults.name}</td>
        <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">{searchResults.email}</td>
        <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">
          <button type="button" className={searchResults.status ? "bg-green-500 text-white py-2 px-4 rounded-lg" : "bg-red-500 text-white py-2 px-4 rounded-lg"} data-toggle="modal" data-target="#lock-modal">
            {searchResults.status ? 'ACTIVO' : 'BLOQUEADO'}
          </button>
        </td>
      </tr>
    )
  )}
</tbody>


</table>

  </div>
</div>








    </div>
  );
};

export default UserSearch;
