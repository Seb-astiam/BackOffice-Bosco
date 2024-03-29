import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const Detalle = () => {

    const { email } = useParams();
    const [usuario, setUsuario] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/user/${email}`);

            if(response.status === 404) {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data,
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
            return setUsuario(response.data)
        }

        setUsuario({})

        fetchData();
    }, [email])





    return (
        <div>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* <!-- Encabezado --> */}
                <div className="bg-gray-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Detalles del Usuario</h2>
                </div>

            {/* <!-- Contenido --> */}
                <div className="px-6 py-4">
                    {/* <!-- Imagen de perfil --> */}
                    <div className="flex items-center justify-center">
                        <img src={usuario?.picture} alt="Imagen de perfil" className="w-24 h-24 rounded-full" />
                    </div>

                    {/* <!-- Información del usuario --> */}
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">Nombre:</p>
                        <p className="text-gray-600">{usuario?.name}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">Correo Electrónico:</p>
                        <p className="text-gray-600">{usuario?.email}</p>
                    </div>

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">Rol:</p>
                        <p className="text-gray-600">{usuario?.Roles && usuario.Roles.length > 0 ? usuario.Roles[0].name : 'Sin rol asignado'}</p>
                    </div>

                    {/* <!-- Botón para editar usuario --> */}
                    <div className="mt-8">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Editar Usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}