import React, { useState } from 'react';

const UserHousing = ({ housing }) => {
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
            <h3 className="text-lg font-semibold">Alojamientos</h3>
          </div>
          <div className="p-4">
            <form id="profile" className="space-y-4">
              {/* Contenido oculto */}
              {isContentVisible && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="table-responsive">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 text-sm">OP</th>
                        
                        <th className="px-2 py-2 text-sm">Título</th>
                        <th className="px-2 py-2 text-sm">
                          Fechas Disponibles
                        </th>
                        <th className="px-2 py-2 text-sm">
                          Fechas de Finalización
                        </th>
                        <th className="px-2 py-2 text-sm">Tipo</th>
                        <th className="px-2 py-2 text-sm">Precio</th>
                        <th className="px-2 py-2 text-sm">Provincia</th>
                        <th className="px-2 py-2 text-sm">Localidad</th>

                        <th className="px-2 py-2 text-sm">Plazas</th>
                        <th className="px-2 py-2 text-sm">Disponibilidad</th>
                        <th className="px-2 py-2 text-sm">
                          Tipo de Alojamiento
                        </th>
                        <th className="px-2 py-2 text-sm">Fecha de Creación</th>
                        <th className="px-2 py-2 text-sm">
                          Fecha de Actualización
                        </th>
                        <th className="px-2 py-2 text-sm">Imágenes</th>
                        <th className="px-2 py-2 text-sm">Servicios</th>
                      </tr>
                    </thead>
                    <tbody>
                      {housing&&
                        housing.map((housi) => (
                          <tr key={housi.id}>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">
                              <div className="flex">
                               
                              </div>
                            </td>
                            
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.title}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.datesAvailable}
                            </td>
                            <td className="border px-2 py-0.3 text-sm w-20 mt-1">
                              {housi.datesEnd}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.type}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.price}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.provinces}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.cities}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.square}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.availability
                                ? "Disponible"
                                : "No disponible"}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.accommodationType}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.createdAt}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housi.updatedAt}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              <div className="flex">
                                {housi.images &&
                                  housi.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Image ${index}`}
                                      className="max-h-8 max-w-8 mr-2 mb-2"
                                    />
                                  ))}
                              </div>
                            </td>
                            <td className="border px-0.5 py-0.5 text-sm w-20 mt-1">
                              <div className="flex flex-row">
                                {housi.Services &&
                                  housi.Services.map((service, index) => (
                                    <span
                                      key={index}
                                      className="bg-gray-200 text-xs px-0.5 py-0.5 rounded mr-1 mb-1"
                                    >
                                      {service.type}
                                    </span>
                                  ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                </div>
              )}
              {/* Botón para mostrar/ocultar contenido */}
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={toggleContentVisibility}
                >
                  {isContentVisible ? 'Ocultar contenido' : 'Cargar alojamientos'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHousing;
