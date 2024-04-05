import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

import {
    containter100vh,
    form,
    h1,
    divLabelInput,
    btn
} from "../estilos/estilosLogin"

export const Login = () => {
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
            const reponse = await axios.post("/loginBackOffice", input);

            if (reponse.status === 200) {
                setLoggedInUser(input.email); 
                setInput({
                    email: '',
                    contraseña: ''
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
            console.log(error.response.data)
        }

    };

    return (
        <div className={containter100vh}> 

        <h1 className="m-[30px]">DashBoard Bosco</h1>
            <form onSubmit={handleSubmit} className={form}>
                
                <h1 className={h1}>Inicio de sesión</h1>

                <div className={divLabelInput}>
                    <label className="px-2">Email: </label>
                    <input placeholder="email" name="email" value={input.email} onChange={handleChange} className="border border-transparent "></input>
                </div>

                <div className={divLabelInput}>
                    <label className="px-2">Contraseña: </label>
                    <input placeholder="contraseña" name="password" value={input.password} onChange={handleChange} className="border border-transparent"></input>
                </div>

                <button disabled={botonDesactivado} className={`${btn} ${botonDesactivado ? 'bg-gray-400 text-white' : ''}`}>Entrar</button>
            </form>
        </div>  
    );
};
