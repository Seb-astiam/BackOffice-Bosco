import { useState } from "react";
import { RiUser3Line, RiMailLine, RiLock2Line  } from "@remixicon/react";
import { isValidUsername, isValidEmail, isValidPassword, isValidPasswordConfirmation } from "./validacionesUserAdmin";
import Swal from 'sweetalert2'
import axios from "axios";


export const CreateUserAdmin = () => {
    const [input, setInput] = useState({
        name: "",
        email: "", 
        password: "", 
        passwordConfirmation: ""
    });

    const [inputError, setInputError] = useState({

        name: { valid: false, error: '' },
        email: { valid: false, error: '' },
        password: { valid: false, error: '' },
        passwordConfirmation: { valid: false, error: '' }
    
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if(name === "name"){
            const { valid, error } = isValidUsername(value);
            setInputError(inputError => ({
                ...inputError, name: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }

        if (name === "email") {
            const { valid, error } = await isValidEmail(value);
            setInputError(inputError => ({
                ...inputError, email: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }

        if (name === "password") {
            const { valid, error } = isValidPassword(value);
            setInputError(inputError => ({
                ...inputError, password: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }

        if (name === "passwordConfirmation") {
            const { valid, error } = isValidPasswordConfirmation(input.password, value);
            setInputError(inputError => ({
                ...inputError, passwordConfirmation: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.values(inputError).every(field => field.valid);
      
        if (!isValid) {
          window.alert('Por favor, complete todos los campos correctamente antes de enviar.');
          return;
        }

        try {
            const responseBack = await axios.post("/user", input, {
              headers: {
                'Content-Type': 'application/json',
              },
        
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: responseBack.data,
                showConfirmButton: false,
                timer: 1500
              });
  
          } catch (error) {
            window.alert('Error al crear usuario')
          }
    }

    const handleClear = () => {
        setInput({
            name: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        });

        setInputError({
            name: { valid: false, error: '' },
            email: { valid: false, error: '' },
            password: { valid: false, error: '' },
            passwordConfirmation: { valid: false, error: '' }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 h-[80%] w-[70%] flex flex-col gap-3 items-center justify-center">

            <h1 className="text-3xl font-serif w-[400px] text-center bg-blue-100 shadow mb-5 p-2 rounded">Formulario para registrar usuarios</h1>

        <div className="mb-4">
            <label className="flex items-center">
                <RiUser3Line className="mr-2" />
                <input placeholder="Nombre" name="name" value={input.name} onChange={handleChange} className="border-b-2 border-gray-300 hover:scale-105 focus:border-blue-500 focus:outline-none" />
            </label>
            <p className="text-red-500 text-xs italic">{inputError.name.error}</p>
        </div>

        <div className="mb-4">
            <label className="flex items-center">
                <RiMailLine className="mr-2" />
                <input placeholder="Correo" name="email" value={input.email} onChange={handleChange} className="border-b-2 border-gray-300 hover:scale-105 focus:border-blue-500 focus:outline-none" />
            </label>
            <p className="text-red-500 text-xs italic">{inputError.email.error}</p>
        </div>

        <div className="mb-4">
            <label className="flex items-center">
                <RiLock2Line className="mr-2" />
                <input placeholder="Contraseña" type="password" name="password" value={input.password} onChange={handleChange} className="border-b-2 hover:scale-105 border-gray-300 focus:border-blue-500 focus:outline-none" />
            </label>
            <p className="text-red-500 text-xs italic">{inputError.password.error}</p>
        </div>

        <div className="mb-4">
            <label className="flex items-center">
                <RiLock2Line className="mr-2" />
                <input placeholder="Repetir contraseña" type="password" name="passwordConfirmation" value={input.passwordConfirmation} onChange={handleChange} className="border-b-2 hover:scale-105 border-gray-300 focus:border-blue-500 focus:outline-none" />
            </label>
            <p className="text-red-500 text-xs italic">{inputError.passwordConfirmation.error}</p>
        </div>

        <button type="button" onClick={handleClear} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Limpiar</button>
        <button type="submit" className="bg-gray-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrar</button>
    </form>
    )
}