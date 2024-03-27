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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label className="flex items-center">
                    <RiUser3Line />
                    <input placeholder="Nombre" name="name" value={input.name} onChange={handleChange} ></input>
                </label>
            </div>
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.name.error}</p>

            <div>
                <label className="flex items-center">
                    <RiMailLine />
                    <input placeholder="Correo"  name="email" value={input.email} onChange={handleChange} ></input>
                </label>
            </div>
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.email.error}</p>

            <div>
                <label className="flex items-center">
                    <RiLock2Line />
                    <input placeholder="Contraseña" name="password" value={input.password} onChange={handleChange} ></input>
                </label>
            </div>
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.password.error}</p>

            <div>
                <label className="flex items-center">
                    <RiLock2Line />
                    <input placeholder="Repetir contraseña" name="passwordConfirmation" value={input.passwordConfirmation} onChange={handleChange} ></input>
                </label>
            </div>
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.passwordConfirmation.error}</p>

            <button>Registrar</button>

        </form>
    )
}