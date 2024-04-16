
import React, { useState, useEffect } from "react";
import { RiUser3Line, RiMailLine, RiLock2Line, RiTeamLine } from "@remixicon/react";
import Swal from 'sweetalert2';
import axios from "axios";
import { isValidUsername, isValidEmail, isValidPassword, isValidPasswordConfirmation, isValidRoleSelection } from "./validacionesUserAdmin";

export const CreateUserAdmin = () => {
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const { data } = await axios.get("/role/allRoles");
            setRoles(data);
        } catch (error) {
            console.error("Algo falló en la petición a mi Backend", error);
        }
    };

    const [roles, setRoles] = useState([]);
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        selectedRoleId: "",
    });

    const [inputError, setInputError] = useState({
        name: { valid: true, error: '' },
        email: { valid: true, error: '' },
        password: { valid: true, error: '' },
        passwordConfirmation: { valid: true, error: '' },
        selectedRoleId: { valid: true, error: '' }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
        // Validar en tiempo real al cambiar los valores de entrada
        validateInput(name, value);
    }

    const validateInput = (name, value) => {
        switch (name) {
            case "name":
                setInputError(prevInputError => ({
                    ...prevInputError,
                    name: isValidUsername(value)
                }));
                break;
            case "email":
                isValidEmail(value).then(result =>
                    setInputError(prevInputError => ({
                        ...prevInputError,
                        email: result
                    }))
                );
                break;
            case "password":
                setInputError(prevInputError => ({
                    ...prevInputError,
                    password: isValidPassword(value)
                }));
                break;
            case "passwordConfirmation":
                setInputError(prevInputError => ({
                    ...prevInputError,
                    passwordConfirmation: isValidPasswordConfirmation(input.password, value)
                }));
                break;
                case "selectedRoleId":
                    setInputError(prevInputError => ({
                        ...prevInputError,
                        selectedRoleId: value ? { valid: true, error: '' } : { valid: false, error: '*Debe seleccionar un rol' }
                    }));
                    break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si hay algún error de validación
        const hasError = Object.values(inputError).some(error => !error.valid);

        if (hasError) {
            return;
        }

        try {
            const responseBack = await axios.post("/userAdmin", {
                ...input,
                selectedRoleId: parseInt(input.selectedRoleId)
            }, {
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
            window.alert('Error al crear usuario');
        }
    }

    const handleClear = () => {
        setInput({
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            selectedRoleId: "",
        });

        setInputError({
            name: { valid: true, error: '' },
            email: { valid: true, error: '' },
            password: { valid: true, error: '' },
            passwordConfirmation: { valid: true, error: '' },
            selectedRoleId: { valid: true, error: '' }
        });
    }

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-gray-100 px-20 mt-2 ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-auto ">
                <div className="mb-4">
                    <div className="flex items-center">
                        <RiUser3Line className="mr-2" />
                        <input placeholder="Nombre" name="name" value={input.name} onChange={handleChange} className="input-field" />
                    </div>
                    <p className="text-red-500 text-xs italic">{inputError.name.error}</p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center">
                        <RiMailLine className="mr-2" />
                        <input placeholder="Correo" name="email" value={input.email} onChange={handleChange} className="input-field" />
                    </div>
                    <p className="text-red-500 text-xs italic">{inputError.email.error}</p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center">
                        <RiLock2Line className="mr-2" />
                        <input placeholder="Contraseña" type="password" name="password" value={input.password} onChange={handleChange} className="input-field" />
                    </div>
                    <p className="text-red-500 text-xs italic">{inputError.password.error}</p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center">
                        <RiLock2Line className="mr-2" />
                        <input placeholder="Repetir contraseña" type="password" name="passwordConfirmation" value={input.passwordConfirmation} onChange={handleChange} className="input-field" />
                    </div>
                    <p className="text-red-500 text-xs italic">{inputError.passwordConfirmation.error}</p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center">
                        <RiTeamLine className="mr-2" />
                        <select
                            id="selectedRoleId"
                            value={input.selectedRoleId}
                            name="selectedRoleId"
                            className="input-field"
                            onChange={handleChange}
                        >
                            <option value="" disabled>Selecciona un Rol</option>
                            {roles.map((rol) => (
                                <option value={rol.id} key={rol.id}>
                                    {rol.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="text-red-500 text-xs italic">{inputError.selectedRoleId.error}</p>
                </div>

                <div className="flex justify-between">
                    <button type="button" onClick={handleClear} className="btn-secondary">Limpiar</button>
                    <button type="submit" onClick={handleSubmit} className={`btn-primary ${!Object.values(inputError).some(error => !error.valid) && input.selectedRoleId !== "" ? "" : "opacity-50 cursor-not-allowed"}`} disabled={Object.values(inputError).some(error => !error.valid) || input.selectedRoleId === ""}>Registrar</button>

                </div>
            </div>
        </div>
    );
}
