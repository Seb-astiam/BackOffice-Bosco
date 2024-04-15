import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocationProvincias } from "../../hooks/useLocationProvincias";
import useCities from "../../hooks/useCities";
import {useReservation } from "../../hooks/useReservation";
import { useSelector } from "react-redux";
import { getAllReservas} from "../../redux/boscoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const Reservartion = ()=>{
  const dispatch = useDispatch();

  useReservation();

  useLocationProvincias();
  const statereservas = useSelector((state) => state.storage.AllReservas);
  const provincias = useSelector((state) => state.storage.AllLocation);
  useEffect(() => {
    setReserva(statereservas);
  }, [ statereservas]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reserva ,setReserva]=useState([])
  const selectedProvinceId = searchQuery.provinces; 
  const cities = useCities(selectedProvinceId);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
   console.log( "soy la query",searchQuery)
  };
  const handleSearch = async () => {
    let query = "?";
  
    for (const [key, value] of Object.entries(searchQuery)) {
      if (value) query += `${key}=${value}&`;
    }
  
    try {
      const { data } = await axios.get(`/reservation/filtered${query}`);
      dispatch(getAllReservas(data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log( "soy la reserva",reserva);


return (   
 //  provinces,
//   cities,
//   price,
//   startDate,
//   endDate,
//   estatus{


<div className="overflow-x-auto  min-w-screen  min-h-screen bg-gray-100">

<div className="m-subheader">
          <div className="m-portlet__head-title">
            <h3 className="text-3xl mr-3 text-blue-900 font-serif">Reservas</h3>
            <div className="mb-20 flex flex-row items-center justify-between space-x-3">
  <select
   onChange={handleChange}
    name="provinces"
    className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
   value={searchQuery.provinces || ""}
  >
    <option value="">Escoge una Ubicacion</option>
    {provincias.map((provincia) => {
      return (
        <option value={provincia.nombre} key={provincia.id}>
          {provincia.nombre}
        </option>
      );
    })}
  </select>

  <select
    onChange={handleChange}
    name="cities"
    className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
   value={searchQuery.cities || ""}
  >
    <option value="">Escoge una ciudad</option>
    {cities.map((localidad) => {
      return (
        <option value={localidad.name} key={localidad.id}>
          {localidad.name}
        </option>
      );
    })}
  </select>
 
  <div className="relative">
  <label htmlFor="endDate" className="text-gray-900 absolute top-0 left-0 bg-white  px-2 ml-3 -mt-6" style={{ backgroundColor: 'transparent' }}>Desde</label>
  <input 
    type="date"
    name="startDate"
    value={searchQuery.startDate || ""}
    onChange={handleChange}
    className="appearance-none border rounded-lg pl-3 py-2 pr-10 placeholder-transparent text-gray-500 placeholder-opacity-50"
    placeholder=" "
    style={{ WebkitAppearance: 'none' }} 
  />
</div>

<div className="relative">
<label htmlFor="endDate" className="text-gray-900 absolute top-0 left-0 bg-white px-2 ml-3 -mt-6" style={{ backgroundColor: 'transparent' }}>Hasta</label>
  <input 
    type="date"
    name="endDate"
    value={searchQuery.endDate || ""}
    onChange={handleChange}
    className="appearance-none border rounded-lg pl-3 py-2 pr-10 placeholder-transparent text-gray-500 placeholder-opacity-50"
    placeholder=" "
    style={{ WebkitAppearance: 'none' }} 
  />
</div>

  <select
  onChange={handleChange}
  name="estatus"
  value={searchQuery.estatus || ""}
  className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
>
  <option value="">Selecciona un Estatus</option>
  <option value="Pending">Pendiente</option>
  <option value="Success">Exitosa</option>
  <option value="Reject">Rechazada</option>
</select>
   <label htmlFor="price" >Precio</label>
  <input placeholder="Buscar por precio"
    type="number"
    id="price"
    name="price"
    min="1"
   
     value={searchQuery.price || ""}
     onChange={handleChange}
    defaultValue={1}
    className="rounded-lg border px-4 py-2"
  />
  

  <button
    className="btn btn-primary px-4 py-2 rounded-lg"
    onClick={handleSearch}
  >
    <FontAwesomeIcon icon={faSearch} style={{ fontSize: "2em" }} />
  </button>
</div>

          </div>
        </div>
    <div className="row">
          <div className="col-md-12">
            <div className="m-portlet m-portlet--mobile">
              <div className="m-portlet__head">
                <div className="m-portlet__head-caption"></div>
              </div>
              <div className="m-portlet__body">
                <div className="table-responsive">
                <table className="w-full">
  <thead>
    <tr>
      <th className="px-2 py-2 text-sm">ID</th>
      <th className="px-2 py-2 text-sm">Estatus</th>
      <th className="px-2 py-2 text-sm">Fecha de Inicio</th>
      <th className="px-2 py-2 text-sm">Fecha de Fin</th>
      <th className="px-2 py-2 text-sm">Precio</th>
      <th className="px-2 py-2 text-sm">Provincia</th>
      <th className="px-2 py-2 text-sm">Localidad</th>
      <th className="px-2 py-2 text-sm">Usuario Alojamiento</th>
      <th className="px-2 py-2 text-sm">Tipo de Alojamiento</th>
      <th className="px-2 py-2 text-sm">Usuario Mascota</th>
      <th className="px-2 py-2 text-sm">Nombre de la Mascota</th>
    </tr>
  </thead>
  <tbody>
    {reserva &&
      reserva.map((reservaItem) => (
        <tr key={reservaItem.id}>
          <td className="border px-2 py-2 text-sm">{reservaItem.id}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.estatus}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.fechaInicio}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.fechaFin}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.Housings[0].price}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.Housings[0].provinces}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.Housings[0].cities}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.Housings[0].User.name}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.Housings[0].accommodationType}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.UserMascotum.User.name}</td>
          <td className="border px-2 py-2 text-sm">{reservaItem.UserMascotum.name}</td>
        </tr>
      ))}
  </tbody>
</table>

                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
)
}

export default Reservartion

// ---------------------------------------------------------------------------------------------------------------------------------------------
// | ID | Estatus    | Fecha de Inicio | Fecha de Fin | Precio | Provincia | Ciudad    | Usuario Alojamiento | Nombre Mascota | Usuario Mascota |
// |----|------------|-----------------|--------------|--------|-----------|-----------|---------------------|----------------|-----------------|
// | 1  | Confirmada | 2024-04-10      | 2024-04-15   | $50    | Barcelona | Barcelona | Maria               | Firulais       | Pedro           |
// |    |            |                 |              |        |           |           |                     |                |                 |
// | 2  | Pendiente  | 2024-05-01      | 2024-05-05   | $80    | Madrid    | Madrid    | Carlos              | Max            | Maria           |
// ----------------------------------------------------------------------------------------------------------------------------------------------


// ----Fecha inicio------
// |                    | 
// ----------------------                    
