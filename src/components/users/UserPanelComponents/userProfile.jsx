import React from 'react';
const UserProfile = ({profile,iduser,email}) => {
  

  const {province,name,surname,genre,city,address,phone,balance,housingProfile,petProfile,createdAt}= profile ? profile : {};
  return (
    <div className="col-span-8">
      <div className="p-4">
        <div className="bg-white shadow-md rounded">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Datos personales</h3>
          </div>
          <div className="p-4">
            <form id="profile" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">ID</p>
                  <p>{iduser}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">DNI</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">19726121</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Nombres</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{name}</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Apellidos</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{surname}</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Sexo</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{genre}</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Email</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{email}</a>
                  </p>
                </div>
                  
                  <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Provincia</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{province}</a>
                  </p>
                </div>
                  <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Ciudad</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{city}</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Direccion</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{address}</a>
                  </p>
                </div>
                  <div>
                  <p className="text-sm font-medium text-gray-600 bg-gray-200">Telefono</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{phone}</a>
                  </p>
                </div>
                  <div>
                  <p className="text-sm font-semibold text-gray-600 bg-gray-200" >Balance</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{balance}</a>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 bg-gray-200" >Fecha de registro</p>
                  <p>
                    <a href="#" className="text-blue-500 hover:underline">{createdAt}</a>
                  </p>
                </div>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
