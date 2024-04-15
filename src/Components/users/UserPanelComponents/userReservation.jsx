import React, { useState } from 'react';

const UserReservation = ({reserva}) => {
  
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = (e) => {
    e.preventDefault();
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="w-full">
      <div className="p-4">
        <div className="bg-white shadow-md rounded">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Reservas</h3>
          </div>
          <div className="p-4">
            <form id="profile" className="space-y-4">
              {/* Contenido oculto */}
              {isContentVisible && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
    {reserva && reserva.map((reservaItem) => (
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
              )}
              {/* Botón para mostrar/ocultar contenido */}
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={toggleContentVisibility}
                >
                  {isContentVisible ? 'Ocultar contenido' : 'Cargar Reservas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReservation;
