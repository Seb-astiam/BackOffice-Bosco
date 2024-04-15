import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import bosco from "../assets/bosco-logo.jpeg";
import Swal from 'sweetalert2';

import Loading from "../components/loading/loading";
const Login = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);

    const [botonDesactivado, setBotonDesactivado] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    useEffect(() => {
        setBotonDesactivado(!(input.email && input.password));
    }, [input.email, input.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("/loginBackOffice", input);

            if (response.status === 200) {
                setLoggedInUser(input.email);
                setInput({ email: '', password: '' });
                navigate('/usuarios', { state: { logged: true } });

                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Bienvenido!',
                  showConfirmButton: false,
                  timer: 1500
                });
              


            } else {
                console.log('Acceso Denegado');
            }

        } catch (error) {
            console.log(error.response.data);
            Swal.fire({
              position: "top-end",
              icon: "error", 
              title: "Acceso denegado",
              showConfirmButton: false,
              timer: 1500
          });
        } 
        finally {
          setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
           <Loading isLoading={isLoading} duration={5000}  />
        <div className="bg-white p-8 rounded-full mb-8 overflow-hidden">
          <img src={bosco} alt="Bosco" className="w-40 h-40 object-contain rounded-full" />
        </div>
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-4xl mb-8 text-center font-bold text-blue-900 font-serif">Back Office Bosco</h1>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
            <button
              disabled={botonDesactivado}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${botonDesactivado ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              style={{ width: '100%' }} // Establecer el ancho del botón al 100%
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
