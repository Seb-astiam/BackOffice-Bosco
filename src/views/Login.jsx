import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Login = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

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
        if (input.email && input.password) {
            setBotonDesactivado(false);
        } else {
            setBotonDesactivado(true);
        }
    }, [input.email, input.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/loginBackOffice", input);

            if (response.status === 200) {
                setLoggedInUser(input.email);
                setInput({
                    email: '',
                    password: '' // Corregí 'contraseña' a 'password'
                });
                navigate('/usuarios', {
                    state: {
                        logged: true
                    }
                });
            } else {
                console.log('Acceso Denegado');
            }

        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl mb-6">Inicio de sesión</h1>

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
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
