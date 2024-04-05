import React, { useState } from 'react';

const Userpets = ({ pet }) => {
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
            <h3 className="text-lg font-semibold">Mascotas</h3>
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
                        
                        <th className="px-2 py-2 text-sm">Nombre</th>
                        
                        <th className="px-2 py-2 text-sm">Tipo</th>
                        <th className="px-2 py-2 text-sm">Edad</th>
                        <th className="px-2 py-2 text-sm">Agresividad</th>
                        <th className="px-2 py-2 text-sm">Genero </th>

                        <th className="px-2 py-2 text-sm">Raza</th>
                        <th className="px-2 py-2 text-sm">Tamano</th>
                         <th className="px-2 py-2 text-sm">Convivencia</th>
                        <th className="px-2 py-2 text-sm">Imágenes</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {pet&&
                        pet.map((pt) => (
                          <tr key={pt.id}>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">
                              <div className="flex">
                               
                              </div>
                            </td>
                            
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.name}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.type}
                            </td>
                            <td className="border px-2 py-0.3 text-sm w-20 mt-1">
                              {pt.age}
                            </td>
                            
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.aggressiveness== true
                              ? "Agresivo"
                            : "No Agresivo"
                            }
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.genre}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.raze}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.size}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {pt.coexistence === true 
                                ? "Si Puede"
                                : "No Puede"}
                            </td>
                           
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              <div className="flex">
                              {
                                  
                                    <img
                                     
                                      src={pt.image}
                                      alt={pt.image}
                                      className="max-h-8 max-w-8 mr-2 mb-2"
                                    />
                                  }
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
                  {isContentVisible ? 'Ocultar contenido' : 'Cargar Mascotas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpets;
