import React, { useState } from 'react';

const UserReservation = ({ profile, iduser, email }) => {
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
                    <p className="text-sm font-medium text-gray-600 bg-gray-200">ID</p>
                    <p>{iduser}</p>
                  </div>
                  {/* Agrega aquí el resto del contenido */}
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
